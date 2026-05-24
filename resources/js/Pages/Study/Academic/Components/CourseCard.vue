<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { MoreVertical, Edit3, Trash2, FileText } from 'lucide-vue-next';

const props = defineProps({
    record: { type: Object, required: true },
    terms: { type: Object, required: true }
});

const emit = defineEmits(['click', 'edit', 'delete']);

const handleClick = () => {
    emit('click', props.record);
};

const handleEdit = () => {
    emit('edit', props.record);
};

const handleDelete = () => {
    emit('delete', props.record.id);
};
</script>

<template>
    <div @click="handleClick" 
        class="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 rounded-[2rem] p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden flex flex-col justify-between min-h-[180px]">
        
        <div class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-50 dark:bg-indigo-900/20 group-hover:scale-150 transition-transform duration-700 ease-out z-0"></div>

        <div class="relative z-20 flex justify-between items-start mb-6">
            <h5 class="text-base font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-8 leading-tight capitalize">{{ record.course_name }}</h5>
            
            <!-- Action Menu -->
            <div class="absolute right-0 top-0 translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" @click.stop>
                <Menu as="div" class="relative inline-block text-left">
                    <MenuButton class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors outline-none">
                        <MoreVertical class="h-5 w-5" />
                    </MenuButton>
                    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <MenuItems class="absolute right-0 mt-2 w-48 origin-top-right bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl outline-none overflow-hidden z-50">
                            <MenuItem v-slot="{ active }">
                                <button @click="handleEdit" :class="[active ? 'bg-slate-50 dark:bg-slate-800' : '', 'flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300']">
                                    <Edit3 class="h-4 w-4" /> {{ $t('study_edit') }}
                                </button>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <button @click="handleDelete" :class="[active ? 'bg-rose-50 dark:bg-slate-800' : '', 'flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500']">
                                    <Trash2 class="h-4 w-4" /> {{ $t('study_delete') }}
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
        
        <div class="relative z-10 flex justify-between items-end mt-auto">
            <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-400 tracking-wide">{{ terms.sks }}: <span class="text-slate-600 dark:text-slate-300">{{ record.sks }}</span></span>
                <span class="text-[10px] font-bold text-slate-400 tracking-wide">{{ terms.grade }}: <span class="text-emerald-600 dark:text-emerald-400 text-xs">{{ record.grade }}</span></span>
            </div>
            <div class="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-2 rounded-xl flex items-center gap-1.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileText class="h-4 w-4" /> {{ record.archives?.length || 0 }}
            </div>
        </div>
    </div>
</template>
