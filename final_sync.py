
import json

en_missing = {
    "student_bento_title": "The Academic Arsenal",
    "student_bento_desc": "Tools to survive and thrive.",
    "student_bento_1_title": "Manual Ledger",
    "student_bento_1_desc": "Track your allowance with zero bank connection.",
    "student_bento_2_title": "Night Mode",
    "student_bento_2_desc": "Perfect for midnight study sessions.",
    "student_bento_3_title": "Cloud Sync",
    "student_bento_3_desc": "Access your data on any device, anywhere.",
    "student_cta_note": "No credit card required. Free for individuals.",
    "brain_cta_note": "Join 5,000+ users offloading their cognitive load.",
    "growth_cta_note": "Start your 1% daily improvement journey today.",
    "solve_mental_cta_note": "Privacy first. No data is ever sold or shared.",
    "freelance_cta_note": "Built for solopreneurs and independent creators.",
    "solve_finance_cta_note": "Manual entry for mindful spending. Secure encryption.",
    "deepwork_cta_note": "The elite productivity protocol for high performers.",
    "atomic_cta_note": "Tiny habits, massive results. Start small.",
    "solve_career_cta_note": "Strategic growth for the modern professional."
}

id_missing = {
    "student_bento_title": "Persenjataan Akademik",
    "student_bento_desc": "Alat untuk bertahan dan berkembang.",
    "student_bento_1_title": "Buku Besar Manual",
    "student_bento_1_desc": "Lacak uang saku tanpa koneksi bank.",
    "student_bento_2_title": "Mode Malam",
    "student_bento_2_desc": "Sempurna untuk sesi belajar tengah malam.",
    "student_bento_3_title": "Sinkronisasi Cloud",
    "student_bento_3_desc": "Akses data di perangkat apa pun, di mana pun.",
    "student_cta_note": "Tidak perlu kartu kredit. Gratis untuk individu.",
    "brain_cta_note": "Bergabunglah dengan 5.000+ pengguna yang melepas beban kognitif mereka.",
    "growth_cta_note": "Mulai perjalanan perbaikan harian 1% Anda hari ini.",
    "solve_mental_cta_note": "Privasi utama. Data tidak pernah dijual atau dibagikan.",
    "freelance_cta_note": "Dibangun untuk solopreneur dan kreator independen.",
    "solve_finance_cta_note": "Entri manual untuk belanja sadar. Enkripsi aman.",
    "deepwork_cta_note": "Protokol produktivitas elit untuk performa tinggi.",
    "atomic_cta_note": "Kebiasaan kecil, hasil masif. Mulai dari yang kecil.",
    "solve_career_cta_note": "Pertumbuhan strategis untuk profesional modern."
}

def sync_and_dedup(file_path, missing_data):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Update with missing data (keys will be added or updated to the new values)
    data.update(missing_data)
    
    # Sort keys for consistent order if desired, but here we just want a clean dump
    # To keep original logic where sections are at top, we just dump it
    # json.dump preserves order in Python 3.7+
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    sync_and_dedup(r'c:\Users\Axioo\dopmymind\lang\en.json', en_missing)
    sync_and_dedup(r'c:\Users\Axioo\dopmymind\lang\id.json', id_missing)
    print("Final Sync and Deduplication Complete.")
