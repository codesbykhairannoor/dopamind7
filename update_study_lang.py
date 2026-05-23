import json
import os

# Paths
id_path = r"c:\Users\Axioo\dopmymind\lang\partials\id\study.json"
en_path = r"c:\Users\Axioo\dopmymind\lang\partials\en\study.json"

new_keys_id = {
    "study_profile_not_set": "Profil Studi Belum Diatur",
    "study_profile_not_set_desc": "Mulai organisasikan seluruh modul, tugas, dan target nilai Anda secara cerdas. Mari sesuaikan sistem ini dengan profil akademis Anda sekarang!",
    "study_start_setup": "Mulai Setup",
    "study_neural_portfolio": "Neural Portfolio",
    "study_neural_portfolio_desc": "Bangun portofolio publik elegan menggunakan AI. Bagikan pencapaian Anda ke dunia profesional.",
    "study_explore_ai": "Jelajahi Ruang AI",
    "study_setup_wizard_title": "Profil Studi",
    "study_education_level": "Jenjang Pendidikan *",
    "study_education_level_uni": "University / College / Perguruan Tinggi",
    "study_education_level_hs": "High School / SMA / Sederajat",
    "study_education_level_ms": "Middle School / SMP / Sederajat",
    "study_education_level_es": "Primary School / SD / Sederajat",
    "study_education_level_other": "Lainnya",
    "study_major_label": "Jurusan / Konsentrasi / Fokus Studi",
    "study_major_placeholder": "Misal: Teknik Informatika",
    "study_student_id_label": "Student ID / NIM / NIS (Opsional)",
    "study_student_id_placeholder": "No. Induk",
    "study_current_semester_label": "Semester Berapa?",
    "study_save_and_start": "Simpan & Mulai",
    "study_add_new_semester": "Tambah Semester Baru",
    "study_add_new_semester_desc": "Masukkan angka semester yang ingin ditambahkan (Misal: 7)",
    "study_btn_next": "Lanjut",
    "study_delete_semester": "Hapus Semester",
    "study_delete_semester_confirm": "Semua mata kuliah dan file di dalamnya akan terhapus permanen!",
    "study_btn_cancel": "Batal",
    "study_btn_yes_delete": "Ya, Hapus",
    "study_edit_course": "Edit Mata Kuliah",
    "study_delete_course": "Hapus",
    "study_edit": "Edit",
    "study_add_course_first": "Tambah Mata Kuliah Pertama",
    "study_add_course_for": "Untuk",
    "study_save_data": "Simpan Data",
    "study_save_changes": "Simpan Perubahan",
    "study_back": "Kembali",
    "study_input_new_meeting": "Input Baru",
    "study_class_empty": "Kelas Masih Kosong",
    "study_class_empty_desc": "Klik tombol 'Input Baru' di atas untuk mulai membuat grup materi.",
    "study_add_file": "Tambah File",
    "study_target_grade": "Target / Akhir *",
    "study_add_new_data": "Tambah Data Baru",
    "study_custom": "Custom",
    "study_delete_this": "Hapus",
    "study_no_data_for": "Belum ada data untuk",
    "study_start_adding": "Mulai tambahkan",
    "study_this_semester": "ini.",
    "study_publish_work": "Publikasikan karya akademis Anda",
    "study_course_list_in": "Daftar",
    "study_course_list_in_2": "di"
}

new_keys_en = {
    "study_profile_not_set": "Study Profile Not Set",
    "study_profile_not_set_desc": "Start organizing all your modules, assignments, and grade targets intelligently. Let's customize this system to your academic profile now!",
    "study_start_setup": "Start Setup",
    "study_neural_portfolio": "Neural Portfolio",
    "study_neural_portfolio_desc": "Build an elegant public portfolio using AI. Share your achievements with the professional world.",
    "study_explore_ai": "Explore AI Space",
    "study_setup_wizard_title": "Study Profile",
    "study_education_level": "Education Level *",
    "study_education_level_uni": "University / College",
    "study_education_level_hs": "High School",
    "study_education_level_ms": "Middle School",
    "study_education_level_es": "Primary School",
    "study_education_level_other": "Other",
    "study_major_label": "Major / Concentration / Study Focus",
    "study_major_placeholder": "e.g., Computer Science",
    "study_student_id_label": "Student ID / NIS (Optional)",
    "study_student_id_placeholder": "ID Number",
    "study_current_semester_label": "Current Semester?",
    "study_save_and_start": "Save & Start",
    "study_add_new_semester": "Add New Semester",
    "study_add_new_semester_desc": "Enter the semester number you want to add (e.g., 7)",
    "study_btn_next": "Continue",
    "study_delete_semester": "Delete Semester",
    "study_delete_semester_confirm": "All courses and files inside will be permanently deleted!",
    "study_btn_cancel": "Cancel",
    "study_btn_yes_delete": "Yes, Delete",
    "study_edit_course": "Edit Course",
    "study_delete_course": "Delete",
    "study_edit": "Edit",
    "study_add_course_first": "Add First Course",
    "study_add_course_for": "For",
    "study_save_data": "Save Data",
    "study_save_changes": "Save Changes",
    "study_back": "Back",
    "study_input_new_meeting": "Input New",
    "study_class_empty": "Class is Empty",
    "study_class_empty_desc": "Click 'Input New' above to start creating material groups.",
    "study_add_file": "Add File",
    "study_target_grade": "Target / Final *",
    "study_add_new_data": "Add New Data",
    "study_custom": "Custom",
    "study_delete_this": "Delete",
    "study_no_data_for": "No data for",
    "study_start_adding": "Start adding",
    "study_this_semester": "this.",
    "study_publish_work": "Publish your academic work",
    "study_course_list_in": "List of",
    "study_course_list_in_2": "in"
}

def update_json(path, new_keys):
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        data = {}
        
    for k, v in new_keys.items():
        if k not in data:
            data[k] = v
            
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

update_json(id_path, new_keys_id)
update_json(en_path, new_keys_en)
print("Updated translations successfully.")
