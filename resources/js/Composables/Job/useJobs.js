import { ref, watch } from 'vue';
import Swal from 'sweetalert2';
import { trans } from 'laravel-vue-i18n';
import axios from 'axios';

export function useJobs(props) {
    // Simpan status asli buat perbandingan nanti (Optimistic UI)
    const localJobs = ref(props.jobs ? props.jobs.map(j => ({ ...j, _key: 'db_' + j.id, _original_status: j.status })) : []);
    const selectedJobs = ref([]);
    
    // STATE STATISTIK LOKAL (Terhubung langsung ke UI)
    const localStats = ref(props.stats ? { ...props.stats } : { total: 0, wishlist: 0, applied: 0, interview: 0, offer: 0, rejected: 0, accepted: 0 });

    watch(() => props.jobs, (newJobs) => {
        const unsavedJobs = localJobs.value.filter(j => j.is_new);
        const incomingJobs = (newJobs || []).map(j => ({ ...j, _key: 'db_' + j.id, _original_status: j.status }));
        localJobs.value = [...unsavedJobs, ...incomingJobs];
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

    // 100% BACKGROUND SAVE (AXIOS ONLY)
    const autoSaveRow = async (job) => {
        if (!job.title || !job.company) return;
        
        // ==========================================
        // 1. OPTIMISTIC UI: UPDATE STATS INSTANTLY
        // ==========================================
        if (!job.is_new && job._original_status !== job.status) {
            // Kurangi angka status lama
            localStats.value[job._original_status] = Math.max(0, (localStats.value[job._original_status] || 1) - 1);
            // Tambah angka status baru
            localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
            
            // Catat status terbarunya
            job._original_status = job.status;
        }

        // Mencegah double hit
        if (job.is_saving) return; 
        job.is_saving = true;

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
                // KIRIM BACKGROUND POST
                const response = await axios.post(route('jobs.store'), payload, {
                    headers: { 'Accept': 'application/json' }
                });
                
                // Update ID dan matikan mode 'new'
                job.id = response.data.data ? response.data.data.id : response.data.id;
                job.is_new = false;
                job._original_status = job.status;
                
                // Tambah total stats secara instan
                localStats.value.total = (localStats.value.total || 0) + 1;
                localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
                
            } else {
                // KIRIM BACKGROUND PATCH
                await axios.patch(route('jobs.update', job.id), payload, {
                    headers: { 'Accept': 'application/json' }
                });
            }
        } catch (error) {
            console.error(error);
            fireError(t('job_error_save', 'Gagal menyimpan! Cek koneksi.'));
            
            // ROLLBACK kalau server error
            if (!job.is_new && job._original_status !== job.status) {
                 localStats.value[job.status] = Math.max(0, (localStats.value[job.status] || 1) - 1);
                 job.status = job._original_status; // Balikin statusnya
                 localStats.value[job.status] = (localStats.value[job.status] || 0) + 1;
            }
        } finally {
            job.is_saving = false;
        }
    };

    const deleteJob = async (id, isNew = false) => {
        if (isNew) {
            localJobs.value = localJobs.value.filter(j => j.id !== id);
            return;
        }

        if (confirm(t('job_confirm_delete_simple', 'Hapus baris ini?'))) {
            const jobToDelete = localJobs.value.find(j => j.id === id);
            
            // OPTIMISTIC DELETE: Kurangi angka & buang baris SEBELUM request
            if (jobToDelete) {
                localStats.value.total = Math.max(0, (localStats.value.total || 1) - 1);
                localStats.value[jobToDelete.status] = Math.max(0, (localStats.value[jobToDelete.status] || 1) - 1);
            }
            localJobs.value = localJobs.value.filter(j => j.id !== id);

            try {
                await axios.delete(route('jobs.destroy', id), {
                    headers: { 'Accept': 'application/json' }
                });
            } catch(e) {
                fireError(t('job_error_save', 'Gagal menghapus dari server!'));
            }
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