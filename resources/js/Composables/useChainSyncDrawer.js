import { reactive, ref } from 'vue';
import axios from 'axios';

const drawerState = reactive({
    isOpen: false,
    source: null,
});

const searchQuery = ref('');
const searchResults = ref([]);
const links = ref([]);
const timeline = ref([]);
const loading = ref(false);
const loadingSearch = ref(false);
const currentStep = ref(1);
const selectedModule = ref(null);
const selectedItem = ref(null);

const thresholdConfig = reactive({
    threshold: 5,
    increment: 1,
});

const plannerConfig = reactive({
    start_time: '07:00',
    end_time: '08:00',
    days_ahead: 14,
    duration_days: 1,
    weekdays_mode: 'daily',
    weekdays: [1, 2, 3, 4, 5, 6, 7],
    title: '',
});

const financeConfig = reactive({
    mode: 'transaction',
    amount: 20000,
    type: 'expense',
    title_mode: 'habit_name',
});

let searchRequestSerial = 0;

const openDrawer = async (source) => {
    drawerState.source = source;
    drawerState.isOpen = true;
    searchQuery.value = '';
    searchResults.value = [];
    currentStep.value = 1;
    selectedModule.value = null;
    selectedItem.value = null;
    await fetchLinksAndTimeline();
};

const closeDrawer = () => {
    drawerState.isOpen = false;
};

const fetchLinksAndTimeline = async () => {
    if (!drawerState.source?.id) return;
    loading.value = true;
    try {
        const [linkRes, timelineRes] = await Promise.all([
            axios.get(route('chainsync.links.index'), {
                params: {
                    source_type: drawerState.source.type,
                    source_id: drawerState.source.id,
                },
            }),
            axios.get(route('chainsync.timeline'), {
                params: {
                    entity_type: drawerState.source.type,
                    entity_id: drawerState.source.id,
                    limit: 12,
                },
            }),
        ]);

        links.value = linkRes?.data?.data || [];
        timeline.value = timelineRes?.data?.data || [];
    } finally {
        loading.value = false;
    }
};

const fetchSearchOptions = async (query, types = [], moduleKey = null) => {
    const serial = ++searchRequestSerial;
    loadingSearch.value = true;
    try {
        const res = await axios.get(route('chainsync.search'), {
            params: {
                q: query || '',
                types,
            },
        });

        if (serial !== searchRequestSerial) {
            return;
        }
        if (moduleKey && selectedModule.value !== moduleKey) {
            return;
        }

        searchResults.value = res?.data?.data || [];
    } finally {
        if (serial === searchRequestSerial) {
            loadingSearch.value = false;
        }
    }
};

const selectModule = async (moduleKey) => {
    selectedModule.value = moduleKey;
    selectedItem.value = null;
    currentStep.value = 2;
    searchQuery.value = '';
    searchResults.value = [];

    const typeMap = {
        goals: ['goal'],
        planner: ['planner_task'],
        finance: ['finance_category', 'finance_saving'],
        habit: ['habit'],
    };

    await fetchSearchOptions('', typeMap[moduleKey] || [], moduleKey);
};

const selectItem = (item) => {
    selectedItem.value = item;
    currentStep.value = 3;
    if (selectedModule.value === 'planner' && plannerConfig.title === '') {
        plannerConfig.title = drawerState.source?.title || 'Auto Habit Task';
    }
};

const goToStep = (step) => {
    currentStep.value = step;
    if (step === 1) {
        selectedModule.value = null;
        selectedItem.value = null;
    }
    if (step === 2) {
        selectedItem.value = null;
    }
};

const connectMultiStep = async () => {
    if (!drawerState.source?.id || !selectedModule.value || !selectedItem.value) return;
    const source = drawerState.source;

    if (selectedModule.value === 'goals') {
        await axios.post(route('chainsync.links.store'), {
            source_type: source.type,
            source_id: source.id,
            target_type: 'goal',
            target_id: selectedItem.value.id,
            relation_type: 'supports_goal',
            rule: {
                trigger_event: 'habit.completed',
                action_type: 'goal.threshold_increment',
                action_payload: {
                    threshold: Number(thresholdConfig.threshold) || 5,
                    increment: Number(thresholdConfig.increment) || 1,
                    cap_to_target: true,
                },
            },
        });
    }

    if (selectedModule.value === 'planner') {
        const weekdays = plannerConfig.weekdays_mode === 'specific' ? plannerConfig.weekdays : [];
        await axios.post(route('chainsync.links.store'), {
            source_type: source.type,
            source_id: source.id,
            target_type: 'planner_task',
            target_id: selectedItem.value.id,
            relation_type: 'auto_timeline',
            rule: {
                trigger_event: 'habit.completed',
                action_type: 'planner.auto_timeline',
                action_payload: {
                    start_time: plannerConfig.start_time,
                    end_time: plannerConfig.end_time,
                    days_ahead: Number(plannerConfig.days_ahead) || 14,
                    duration_days: Number(plannerConfig.duration_days) || 1,
                    weekdays,
                    title: plannerConfig.title || source.title || 'Auto Habit Task',
                },
            },
        });
    }

    if (selectedModule.value === 'finance') {
        if (financeConfig.mode === 'saving') {
            if (selectedItem.value?.type !== 'finance_saving') {
                window.alert('Pilih item tabungan dulu untuk mode tambah tabungan.');
                return;
            }

            await axios.post(route('chainsync.links.store'), {
                source_type: source.type,
                source_id: source.id,
                target_type: 'finance_saving',
                target_id: selectedItem.value.id,
                relation_type: 'finance_saving_automation',
                rule: {
                    trigger_event: 'habit.completed',
                    action_type: 'finance.adjust_saving',
                    action_payload: {
                        amount: Number(financeConfig.amount) || 20000,
                        direction: financeConfig.type === 'income' ? 'withdraw' : 'deposit',
                    },
                },
            });
        } else {
            if (selectedItem.value?.type !== 'finance_category') {
                window.alert('Pilih kategori keuangan dulu untuk mode transaksi otomatis.');
                return;
            }

            const categorySlug = selectedItem.value?.meta?.slug || selectedItem.value?.subtitle || 'habits';
            await axios.post(route('chainsync.links.store'), {
                source_type: source.type,
                source_id: source.id,
                target_type: 'finance_transaction',
                target_id: 0,
                relation_type: 'finance_automation',
                rule: {
                    trigger_event: 'habit.completed',
                    action_type: 'finance.create_transaction',
                    action_payload: {
                        amount: Number(financeConfig.amount) || 20000,
                        type: financeConfig.type === 'income' ? 'income' : 'expense',
                        category: categorySlug,
                        title: financeConfig.title_mode === 'habit_name'
                            ? `Auto ${source.title || 'Habit'}`
                            : 'Auto Habit Transaction',
                    },
                },
            });
        }
    }

    await fetchLinksAndTimeline();
    currentStep.value = 1;
    selectedModule.value = null;
    selectedItem.value = null;
};

export function useChainSyncDrawer() {
    return {
        drawerState,
        searchQuery,
        searchResults,
        links,
        timeline,
        loading,
        loadingSearch,
        currentStep,
        selectedModule,
        selectedItem,
        thresholdConfig,
        plannerConfig,
        financeConfig,
        openDrawer,
        closeDrawer,
        fetchSearchOptions,
        selectModule,
        selectItem,
        goToStep,
        connectMultiStep,
        fetchLinksAndTimeline,
    };
}
