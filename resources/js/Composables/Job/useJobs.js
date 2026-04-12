import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';
import { router } from '@inertiajs/vue3';
import axios from 'axios';
import { useGating } from '@/Composables/useGating';

export function useJobs(props) {
    const { canUse, isExplorer } = useGating();
    const localJobs = ref([]);
    const selectedJobs = ref([]);
    const localStats = ref({ total: 0, wishlist: 0, applied: 0, interview: 0, offer: 0, rejected: 0, accepted: 0 });

    const initLocalData = () => {
        if (props.jobs) {
            localJobs.value = props.jobs.map(j => ({ ...j, _key: 'db_' + j.id, _original_status: j.status }));
        }
        if (props.stats) {
            localStats.value = { ...props.stats };
        }
    };

    initLocalData();

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
        if (isExplorer.value && localJobs.value.length >= 1) {
            fireError('Explorer limit: 1 Job Tracked. Upgrade to Architect for unlimited tracking!');
            return;
        }
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
    const autoSaveRow = async (job) => {
        if (!job.title || !job.company) return;

        // PENCEGAHAN ERROR POSTGRESQL: Jangan kirim PATCH kalau ID belum berupa angka asli dari DB!
        if (!job.is_new && String(job.id).startsWith('temp_')) {
            console.log('Menunggu ID asli dari server...');
            return;
        }

        if (job.is_saving) return;

        job.is_saving = true;

        if (!job.is_new && job._original_status !== job.status) {
            localStats.value[job._original_status] = Math.max(0, (localStats.value[job._original_status] || 1) - 1);
            localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
            job._original_status = job.status;
        }

        const payload = {
            title: job.title,
            company: job.company,
            status: job.status,
            location: job.location,
            applied_date: job.applied_date,
            salary: job.salary || null,
        };

        try {
            if (job.is_new) {
                const response = await axios.post(route('jobs.store'), payload, {
                    headers: { 'Accept': 'application/json' }
                });

                job.id = response.data.data ? response.data.data.id : response.data.id;
                job.is_new = false;
                job._original_status = job.status;

                localStats.value.total = (localStats.value.total || 0) + 1;
                localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
            } else {
                await axios.patch(route('jobs.update', job.id), payload, {
                    headers: { 'Accept': 'application/json' }
                });
            }
        } catch (error) {
            console.error(error);
            fireError(t('job_error_save', 'Gagal menyimpan! Cek koneksi.'));

            if (!job.is_new && job._original_status !== job.status) {
                localStats.value[job.status] = Math.max(0, (localStats.value[job.status] || 1) - 1);
                job.status = job._original_status;
                localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
            }
        } finally {
            job.is_saving = false;
        }
    };

    const deleteJob = async (id, isNew = false) => {
        // PENCEGAHAN ERROR POSTGRESQL SAAT HAPUS BARIS
        if (isNew || String(id).startsWith('temp_')) {
            localJobs.value = localJobs.value.filter(j => j.id !== id);
            return;
        }

        const jobToDelete = localJobs.value.find(j => j.id === id);

        if (jobToDelete) {
            localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
            localStats.value[jobToDelete.status] = Math.max(0, (localStats.value[jobToDelete.status] || 1) - 1);
        }

        // Optimistic UI update - hide row instantly
        localJobs.value = localJobs.value.filter(j => j.id !== id);

        try {
            await axios.delete(route('jobs.destroy', id), {
                headers: { 'Accept': 'application/json' }
            });
        } catch (e) {
            fireErrorWrapper(t('job_error_save', 'Gagal menghapus dari server!'));
        }
    };

    const toggleSelection = (jobId, index = -1) => {
        const selIndex = selectedJobs.value.indexOf(jobId);
        selIndex > -1 ? selectedJobs.value.splice(selIndex, 1) : selectedJobs.value.push(jobId);
    };

    const shiftSelect = (index, jobId) => {
        if (selectedJobs.value.length === 0) {
            selectedJobs.value.push(jobId);
            return;
        }

        // Find the last selected job's index in the localJobs array
        const lastSelectedId = selectedJobs.value[selectedJobs.value.length - 1];
        const lastIndex = localJobs.value.findIndex(j => j.id === lastSelectedId);

        if (lastIndex === -1) {
            selectedJobs.value.push(jobId);
            return;
        }

        const start = Math.min(lastIndex, index);
        const end = Math.max(lastIndex, index);

        for (let i = start; i <= end; i++) {
            const id = localJobs.value[i].id;
            if (!selectedJobs.value.includes(id)) {
                selectedJobs.value.push(id);
            }
        }
    };

    const selectAll = () => {
        selectedJobs.value.length === localJobs.value.length
            ? selectedJobs.value = []
            : selectedJobs.value = localJobs.value.map(j => j.id);
    };

    // --- BULK ACTIONS ---
    const bulkDelete = async () => {
        if (selectedJobs.value.length === 0) return;
        if (!confirm(t('job_bulk_delete_confirm', `Hapus ${selectedJobs.value.length} lamaran sekaligus?`))) return;

        const idsToDelete = [...selectedJobs.value];
        const validIds = idsToDelete.filter(id => !String(id).startsWith('temp_'));

        // Update UI optimistically
        idsToDelete.forEach(id => {
            const job = localJobs.value.find(j => j.id === id);
            if (job) {
                localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
                localStats.value[job.status] = Math.max(0, (localStats.value[job.status] || 1) - 1);
            }
        });
        localJobs.value = localJobs.value.filter(j => !idsToDelete.includes(j.id));
        selectedJobs.value = [];

        if (validIds.length > 0) {
            try {
                await axios.post(route('jobs.bulk-delete'), { ids: validIds }, {
                    headers: { 'Accept': 'application/json' }
                });
                fireError(t('job_bulk_delete_success', 'Berhasil dihapus!'), 'success', '#10b981');
            } catch (e) {
                fireError(t('job_error_save', 'Gagal menghapus masal!'));
            }
        }
    };

    const bulkDuplicate = () => {
        if (selectedJobs.value.length === 0) return;

        const jobsToCopy = localJobs.value.filter(j => selectedJobs.value.includes(j.id));

        // Reverse so they appear in correct order when unshifting
        [...jobsToCopy].reverse().forEach(job => {
            const newJob = {
                ...job,
                id: 'temp_' + Date.now() + Math.random().toString(36).substr(2, 5),
                _key: 'temp_key_' + Date.now() + Math.random().toString(36).substr(2, 5),
                is_new: true,
                is_saving: false
            };
            localJobs.value.unshift(newJob);

            // Auto save immediately
            setTimeout(() => autoSaveRow(newJob), 100);
        });

        selectedJobs.value = [];
        fireError(t('job_bulk_copy_success', `${jobsToCopy.length} baris diduplikasi.`), 'success', '#10b981'); // Custom alert for success
    };

    // Override fireError to support success colors
    const fireCustomTip = (message, icon = 'success', color = '#10b981') => {
        Swal.fire({
            toast: true, position: 'top-end', showConfirmButton: false,
            timer: 3000, background: color, iconColor: '#ffffff', icon: icon,
            title: `<span style="color: white; font-weight: 700; font-size: 14px;">${message}</span>`,
            customClass: { popup: '!rounded-xl !shadow-lg !m-4' }
        });
    };

    // Repatch existing fireError locally or use fireCustomTip
    const fireErrorWrapper = (msg, icon = 'error', color = '#e11d48') => {
        if (icon === 'success') {
            fireCustomTip(msg, icon, color);
        } else {
            fireError(msg);
        }
    }


    return {
        localJobs, selectedJobs, localStats,
        addEmptyRow, autoSaveRow, deleteJob,
        toggleSelection, selectAll, shiftSelect,
        bulkDelete, bulkDuplicate, fireError: fireErrorWrapper // Expose for custom alerts if needed
    };
}