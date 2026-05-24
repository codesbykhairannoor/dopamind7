<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronDown, Trash2, Plus } from 'lucide-vue-next';

const props = defineProps({
    userSettings: { type: Object, required: true },
    terms: { type: Object, required: true },
    availableSemesters: { type: Array, required: true },
    selectedSemester: { type: [Number, String], required: true }
});

const emit = defineEmits([
    'select-semester',
    'delete-specific-semester',
    'add-semester-click',
    'add-course-click'
]);

const selectSemester = (sem) => {
    emit('select-semester', sem);
};

const deleteSpecificSemester = (sem) => {
    emit('delete-specific-semester', sem);
};

const promptNewSemester = () => {
    emit('add-semester-click');
};

const openAddCourse = () => {
    emit('add-course-click');
};
</script>

<template>
    <header class="relative z-40 transition-all bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
        <div class="w-full min-w-0 px-4 md:px-8 py-4">
            <div class="flex flex-col items-stretch justify-between gap-4 min-w-0 md:flex-row md:items-center">
                <div class="flex items-center gap-2 w-full min-w-0 md:w-auto md:max-w-[min(100%,22rem)]">
                    <p class="shrink-0 text-[13px] font-black capitalize tracking-wide text-slate-700 dark:text-slate-300 mr-2 pr-4">
                        {{ $t('study_academic_binder_title', 'Academic Binder') }} &bull; 
                        <span class="text-slate-400">{{ userSettings.major || terms.course }}</span>
                    </p>
                </div>
                
                <div class="flex min-w-0 flex-wrap items-center w-full gap-3 md:w-auto md:flex-nowrap md:justify-end">
                    <!-- Dropdown Semester Dinamis -->
                    <div class="relative min-w-0 flex-1 md:flex-none md:max-w-xs z-50">
                        <Menu as="div" class="relative inline-block text-left w-full">
                            <MenuButton class="w-full min-w-0 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-4 pr-3 py-2.5 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 hover:shadow-sm transition-all active:scale-95 outline-none">
                                <div class="flex min-w-0 flex-1 flex-col items-start leading-none text-left">
                                    <span class="text-[9px] text-slate-400 dark:text-slate-500 mb-0.5">{{ terms.semester }}</span>
                                    <span class="w-full truncate text-xs">{{ selectedSemester }}</span>
                                </div>
                                <div class="p-1 bg-white dark:bg-slate-800 border shadow-sm rounded-lg border-slate-100 dark:border-slate-700 flex items-center justify-center">
                                    <ChevronDown class="h-3 w-3 text-indigo-500" />
                                </div>
                            </MenuButton>
                            
                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right bg-white dark:bg-slate-900 rounded-3xl shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800 p-2 z-[60] max-h-60 overflow-y-auto custom-scrollbar">
                                    <MenuItem v-for="sem in availableSemesters" :key="sem" v-slot="{ active }">
                                        <div class="relative group flex items-center w-full mb-1">
                                            <button @click="selectSemester(sem)" :class="[active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400', 'flex-1 text-left px-4 py-3 rounded-2xl text-[11px] font-black transition-all']">
                                                {{ terms.semester }} {{ sem }}
                                            </button>
                                            <button @click.stop="deleteSpecificSemester(sem)" class="absolute right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all z-20">
                                                <Trash2 class="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </MenuItem>
                                    <div class="border-t border-slate-100 dark:border-slate-800 my-2 mx-2"></div>
                                    <MenuItem v-slot="{ active }">
                                        <button @click="promptNewSemester" :class="[active ? 'bg-indigo-50 dark:bg-slate-800' : '', 'group flex w-full items-center px-4 py-3 rounded-2xl text-[11px] font-black text-indigo-600 dark:text-indigo-400 transition-colors']">
                                            <Plus class="h-4 w-4 mr-2" /> {{ $t('study_custom', 'Custom') }}
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
            
                    <!-- Button Tambah Matkul -->
                    <button @click="openAddCourse" class="h-[46px] shrink-0 px-5 flex items-center gap-3 text-white rounded-xl font-bold hover:-translate-y-0.5 active:translate-y-0 shadow-lg transition-all duration-300 whitespace-nowrap bg-indigo-600 shadow-indigo-100 dark:shadow-indigo-900/40 hover:bg-indigo-700">
                        <div class="bg-white/20 rounded-lg p-0.5 flex items-center justify-center">
                            <Plus class="h-4 w-4" />
                        </div>
                        <span class="hidden md:inline text-xs capitalize tracking-wide font-black">
                            {{ $t('study_add_course_btn') }} {{ terms.course }}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
