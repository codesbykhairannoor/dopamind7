import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';
import { router } from '@inertiajs/vue3'; // 👈 KITA KEMBALI PAKAI ROUTER INERTIA

export function useJobs(props) {
    const localJobs = ref(props.jobs ? props.jobs.map(j => ({ ...j, _key: 'db_' + j.id, _original_status: j.status })) : []);
    const selectedJobs = ref([]);
    
    const localStats = ref(props.stats ? { ...props.stats } : { total: 0, wishlist: 0, applied: 0, interview: 0, offer: 0, rejected: 0, accepted: 0 });

    watch(() => props.jobs, (newJobs) => {
        const unsavedJobs = localJobs.value.filter(j => j.is_new);
        const incomingJobs = (newJobs || []).map(j => ({ ...j, _key: 'db_' + j.id, _original_status: j.status }));
        localJobs.value = [...unsavedJobs, ...incomingJobs];
    }, { deep: true });

    watch(() => props.stats, (newStats) => {
        if (newStats) localStats.value = { ...newStats };
    }, { deep: true });

    const t = (key, fallback) => {
        const result = trans(key);
        return result !== key ? result : fallback;
    };

    const fireError = (message) => {
        Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false,
            timer: 3000, background: '#e11d48', iconColor: '#ffffff', icon: 'error',
            title: `<span style="color: white; font-weight: 700; font-size: 14px;">${message}</span>`,
            customClass: { popup: '!rounded-xl !shadow-lg !m-4' }
        });
    };

    const addEmptyRow = () => {
        localJobs.value.unshift({
            id: 'temp_' + Date.now(),
            _key: 'temp_key_' + Date.now(),
            is_new: true,
            title: '',
            company: '',
            status: 'wishlist',
            _original_status: 'wishlist',
            location: '',
            applied_date: new Date().toISOString().split('T')[0],
            salary: null,
            is_saving: false
        });
    };

    // 🔥 LOGIC AUTO SAVE DENGAN SILENT INERTIA + OPTIMISTIC UI
    const autoSaveRow = (job) => {
        if (!job.title || !job.company) return;
        if (job.is_saving) return; 
        
        job.is_saving = true;

        // 1. OPTIMISTIC UI (Ubah Angka Langsung di Frontend 0ms)
        if (!job.is_new && job._original_status !== job.status) {
            localStats.value[job._original_status] = Math.max(0, (localStats.value[job._original_status] || 1) - 1);
            localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
        }

        const payload = {
            title: job.title,
            company: job.company,
            status: job.status,
            location: job.location,
            applied_date: job.applied_date,
            salary: job.salary || null,
        };

        // 2. BACKGROUND SILENT REQUEST PAKAI INERTIA (Gak Kena 419)
        if (job.is_new) {
            router.post(route('jobs.store'), payload, {
                preserveScroll: true,
                preserveState: true,
                replace: true, // Jangan nambah history browser
                onSuccess: (page) => {
                    // Update ID dengan ID asli dari server hasil kembalian Inertia
                    // Karena lu ngembaliin page (back()->with('success')), data baru itu akan masuk lewat watch props.jobs
                    job.is_new = false;
                    job._original_status = job.status;
                    
                    // Nambah stat setelah beneran sukses
                    localStats.value.total = (localStats.value.total || 0) + 1;
                    localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
                    job.is_saving = false;
                },
                onError: () => {
                    fireError(t('job_error_save', 'Gagal menyimpan! Cek koneksi.'));
                    job.is_saving = false;
                }
            });
        } else {
            router.patch(route('jobs.update', job.id), payload, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onSuccess: () => {
                    job._original_status = job.status;
                    job.is_saving = false;
                },
                onError: () => {
                    fireError(t('job_error_save', 'Gagal menyimpan update!'));
                    // Rollback kalau gagal
                    if (job._original_status !== job.status) {
                        localStats.value[job.status] = Math.max(0, (localStats.value[job.status] || 1) - 1);
                        job.status = job._original_status; 
                        localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
                    }
                    job.is_saving = false;
                }
            });
        }
    };

    const deleteJob = (id, isNew = false) => {
        if (isNew) {
            localJobs.value = localJobs.value.filter(j => j.id !== id);
            return;
        }

        if (confirm(t('job_confirm_delete_simple', 'Hapus baris ini?'))) {
            const jobToDelete = localJobs.value.find(j => j.id === id);
            
            // Optimistic Delete UI Dulu
            if (jobToDelete) {
                localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
                localStats.value[jobToDelete.status] = Math.max(0, (localStats.value[jobToDelete.status] || 1) - 1);
            }
            localJobs.value = localJobs.value.filter(j => j.id !== id);

            // Silent Delete pakai Inertia
            router.delete(route('jobs.destroy', id), {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onError: () => {
                    fireError(t('job_error_save', 'Gagal menghapus dari server!'));
                }
            });
        }
    };

    const toggleSelection = (jobId) => {
        const index = selectedJobs.value.indexOf(jobId);
        index > -1 ? selectedJobs.value.splice(index, 1) : selectedJobs.value.push(jobId);
    };

    const selectAll = () => {
        selectedJobs.value.length === localJobs.value.length 
            ? selectedJobs.value = [] 
            : selectedJobs.value = localJobs.value.map(j => j.id);
    };

    return {
        localJobs, selectedJobs, localStats, 
        addEmptyRow, autoSaveRow, deleteJob,
        toggleSelection, selectAll
    };
}