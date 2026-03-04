import { ref, computed } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';

export function useJobs(props) {
    const localJobs = ref([...props.jobs]);
    const isFormOpen = ref(false);
    const isEditing = ref(false);
    const selectedJobs = ref([]);

    const form = useForm({
        id: null,
        title: '',
        company: '',
        status: 'wishlist',
        salary: null,
        notes: '',
        applied_date: null,
        location: '',
        job_url: '',
    });

    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    const fireToast = (icon, message, bgColor = '#4f46e5') => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: bgColor,
            iconColor: '#ffffff',
            icon: icon,
            title: `<span style="color: white; font-weight: 900; font-size: 14px;">${message}</span>`,
            customClass: {
                container: '!fixed !top-5 !right-5 !p-0 !z-[100000] !items-start !justify-end',
                popup: '!flex !items-center !gap-3 !py-3 !px-6 !rounded-full !shadow-2xl !border-none !w-auto !h-auto !min-w-[280px] !m-0',
            }
        });
    };

    const openForm = (job = null) => {
        form.reset();
        form.clearErrors();

        if (job) {
            isEditing.value = true;
            form.id = job.id;
            form.title = job.title;
            form.company = job.company;
            form.status = job.status;
            form.salary = job.salary;
            form.notes = job.notes || '';
            form.applied_date = job.applied_date;
            form.location = job.location || '';
            form.job_url = job.job_url || '';
        } else {
            isEditing.value = false;
        }

        isFormOpen.value = true;
    };

    const closeForm = () => {
        isFormOpen.value = false;
        form.reset();
    };

    const submitJob = () => {
        if (!form.title || !form.company) {
            return fireToast('warning', t('warn_fill_required', 'Please fill required fields!'));
        }

        const payload = { ...form.data() };
        isFormOpen.value = false;

        if (isEditing.value) {
            const index = localJobs.value.findIndex(j => j.id === form.id);
            if (index !== -1) localJobs.value[index] = { ...localJobs.value[index], ...payload };

            router.patch(route('jobs.update', form.id), payload, {
                preserveScroll: true,
                preserveState: true,
                progress: false,
                only: ['jobs', 'stats', 'errors'],
                onSuccess: () => fireToast('success', t('success_updated', 'Updated!')),
                onError: () => fireToast('error', t('error_update', 'Failed to update!')),
                onFinish: () => form.reset()
            });
        } else {
            const tempId = 'temp_' + Date.now();
            localJobs.value.unshift({ ...payload, id: tempId });

            router.post(route('jobs.store'), payload, {
                preserveScroll: true,
                preserveState: true,
                progress: false,
                only: ['jobs', 'stats', 'errors'],
                onSuccess: () => fireToast('success', t('success_created', 'Created!')),
                onError: () => {
                    localJobs.value = localJobs.value.filter(j => j.id !== tempId);
                    fireToast('error', t('error_create', 'Failed to create!'));
                },
                onFinish: () => form.reset()
            });
        }
    };

    const deleteJob = (id) => {
        if (!id) return;

        Swal.fire({
            title: t('confirm_delete', 'Delete this job?'),
            text: t('confirm_delete_text', 'This action cannot be undone'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('btn_delete', 'Delete'),
            cancelButtonText: t('btn_cancel', 'Cancel'),
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-[2rem] p-8 border border-slate-100 shadow-2xl',
                title: 'text-xl font-black text-slate-800 mb-2',
                htmlContainer: 'text-sm text-slate-500 font-bold mb-4',
                confirmButton: 'bg-rose-500 text-white font-black py-3 px-6 rounded-xl shadow-xl shadow-rose-200 active:scale-95 transition-all mx-2',
                cancelButton: 'bg-slate-100 text-slate-400 font-black py-3 px-6 rounded-xl hover:bg-slate-200 active:scale-95 transition-all mx-2',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                localJobs.value = localJobs.value.filter(j => j.id !== id);

                router.delete(route('jobs.destroy', id), {
                    preserveScroll: true,
                    preserveState: true,
                    progress: false,
                    only: ['jobs', 'stats', 'errors'],
                    onSuccess: () => fireToast('success', t('success_deleted', 'Deleted!')),
                    onError: () => fireToast('error', t('error_delete', 'Failed to delete!'))
                });
            }
        });
    };

    const toggleSelection = (jobId) => {
        const index = selectedJobs.value.indexOf(jobId);
        if (index > -1) {
            selectedJobs.value.splice(index, 1);
        } else {
            selectedJobs.value.push(jobId);
        }
    };

    const selectAll = () => {
        if (selectedJobs.value.length === localJobs.value.length) {
            selectedJobs.value = [];
        } else {
            selectedJobs.value = localJobs.value.map(j => j.id);
        }
    };

    const bulkUpdateStatus = (status) => {
        if (selectedJobs.value.length === 0) {
            return fireToast('warning', t('warn_select_jobs', 'Please select jobs first!'));
        }

        router.post(route('jobs.bulk-update-status'), {
            job_ids: selectedJobs.value,
            status: status
        }, {
            preserveScroll: true,
            preserveState: true,
            progress: false,
            only: ['jobs', 'stats', 'errors'],
            onSuccess: () => {
                selectedJobs.value = [];
                fireToast('success', t('success_bulk_update', 'Jobs updated!'));
            },
            onError: () => fireToast('error', t('error_bulk_update', 'Failed to update jobs!'))
        });
    };

    const bulkDelete = () => {
        if (selectedJobs.value.length === 0) {
            return fireToast('warning', t('warn_select_jobs', 'Please select jobs first!'));
        }

        Swal.fire({
            title: t('confirm_bulk_delete', `Delete ${selectedJobs.value.length} jobs?`),
            text: t('confirm_delete_text', 'This action cannot be undone'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('btn_delete', 'Delete'),
            cancelButtonText: t('btn_cancel', 'Cancel'),
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-[2rem] p-8 border border-slate-100 shadow-2xl',
                title: 'text-xl font-black text-slate-800 mb-2',
                htmlContainer: 'text-sm text-slate-500 font-bold mb-4',
                confirmButton: 'bg-rose-500 text-white font-black py-3 px-6 rounded-xl shadow-xl shadow-rose-200 active:scale-95 transition-all mx-2',
                cancelButton: 'bg-slate-100 text-slate-400 font-black py-3 px-6 rounded-xl hover:bg-slate-200 active:scale-95 transition-all mx-2',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('jobs.bulk-delete'), {
                    job_ids: selectedJobs.value
                }, {
                    preserveScroll: true,
                    preserveState: true,
                    progress: false,
                    only: ['jobs', 'stats', 'errors'],
                    onSuccess: () => {
                        selectedJobs.value = [];
                        fireToast('success', t('success_bulk_delete', 'Jobs deleted!'));
                    },
                    onError: () => fireToast('error', t('error_bulk_delete', 'Failed to delete jobs!'))
                });
            }
        });
    };

    return {
        localJobs,
        isFormOpen,
        isEditing,
        form,
        selectedJobs,
        openForm,
        closeForm,
        submitJob,
        deleteJob,
        toggleSelection,
        selectAll,
        bulkUpdateStatus,
        bulkDelete,
    };
}
