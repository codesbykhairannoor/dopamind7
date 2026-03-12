
import json

en_final = {
    "schema_solution_freelancer_description_en": "Custom OS for freelancers managing multiple clients, projects, and finances in one unified system.",
    "schema_solution_freelancer_description_id": "Sistem OS khusus untuk freelancer mengelola banyak klien, proyek, dan keuangan dalam satu sistem terpadu.",
    "schema_solution_growth_description": "Accelerate your personal growth through habit identity formation and long-term goal tracking.",
    "schema_solution_growth_name": "Personal Growth & Identity Mastery",
    "schema_solution_student_audience": "College students, high schoolers, and lifelong learners.",
    "schema_solution_student_description_en": "Academic optimization system for students aiming for peak grades without sacrificing mental health.",
    "schema_solution_student_description_id": "Sistem optimasi akademik untuk mahasiswa yang mengejar nilai maksimal tanpa mengorbankan kesehatan mental.",
    "schema_student_description": "Master your studies with spaced repetition and intelligent scheduling.",
    "schema_student_name": "Student Peak Performance",
    "schema_solution_atomic_description": "Build systems, not just goals. Transform 1% daily improvements into massive lifetime results.",
    "schema_solution_atomic_name": "Atomic Habit System",
    "schema_solution_career_description": "Accelerate your career with project management and professional reflection systems.",
    "schema_solution_career_name": "Career Accelerator",
    "schema_solution_deepwork_description": "Master deep focus and eliminate distractions for peak work output.",
    "schema_solution_deepwork_name": "Deep Work Protocol",
    "schema_solution_finance_mastery_description": "Master personal finance with manual budget tracking and future planning.",
    "schema_solution_finance_mastery_name": "Financial Mastery"
}

id_final = {
    "brain_hub_title": "Hub Informasi OneForMind",
    "brain_hub_inbox_title": "Inbox Cepat",
    "brain_hub_inbox_desc": "Capture setiap ide, tugas, atau link dalam hitungan detik. Jangan biarkan wawasan berharga hilang.",
    "brain_hub_os_title": "Life OS Terpadu",
    "brain_hub_os_desc": "Atur informasi secara otomatis ke dalam sistem PARA (Project, Areas, Resources, Archives).",
    "schema_solution_atomic_description": "Bangun sistem, bukan hanya tujuan. Ubah perbaikan 1% harian menjadi hasil seumur hidup yang masif.",
    "schema_solution_atomic_name": "Sistem Habit Atomic",
    "schema_solution_career_description": "Akselerasi karir Anda dengan sistem manajemen proyek dan jurnal refleksi profesional.",
    "schema_solution_career_name": "Akselerator Karir",
    "schema_solution_deepwork_description": "Kuasai fokus mendalam dan hilangkan distraksi untuk hasil kerja maksimal.",
    "schema_solution_deepwork_name": "Protokol Deep Work",
    "schema_solution_finance_mastery_description": "Kuasai keuangan pribadi dengan pelacakan anggaran manual dan perencanaan masa depan.",
    "schema_solution_finance_mastery_name": "Penguasaan Finansial",
    "schema_solution_freelancer_description_en": "Custom OS for freelancers managing multiple clients, projects, and finances in one unified system.",
    "schema_solution_freelancer_description_id": "Sistem OS khusus untuk freelancer mengelola banyak klien, proyek, dan keuangan dalam satu sistem terpadu.",
    "schema_solution_growth_description": "Percepat pertumbuhan pribadi Anda melalui pembentukan identitas kebiasaan dan pelacakan tujuan jangka panjang.",
    "schema_solution_growth_name": "Pertumbuhan Pribadi & Penguasaan Identitas",
    "schema_solution_student_audience": "Mahasiswa, siswa sekolah menengah, dan pembelajar seumur hidup.",
    "schema_solution_student_description_en": "Academic optimization system for students aiming for peak grades without sacrificing mental health.",
    "schema_solution_student_description_id": "Sistem optimasi akademik untuk mahasiswa yang mengejar nilai maksimal tanpa mengorbankan kesehatan mental.",
    "schema_student_description": "Kuasai studi Anda dengan pengulangan berjarak dan penjadwalan cerdas.",
    "schema_student_name": "Performa Puncak Mahasiswa"
}

def sync_and_dedup(file_path, missing_data):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    data.update(missing_data)
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    sync_and_dedup(r'c:\Users\Axioo\dopmymind\lang\en.json', en_final)
    sync_and_dedup(r'c:\Users\Axioo\dopmymind\lang\id.json', id_final)
    print("Final Schema and Hub Keys Sync Complete.")
