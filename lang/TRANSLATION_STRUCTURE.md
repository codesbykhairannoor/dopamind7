# 📖 Struktur Translation OneForMind

## 📁 Organisasi File

```
lang/
├── en.json (INDEX - referensi untuk EN)
├── id.json (INDEX - referensi untuk ID)
├── partials/
│   ├── en/
│   │   ├── global.json      ← Navigasi, Footer, Legal, ToS
│   │   ├── auth.json        ← Login, Register, Reset Password
│   │   ├── common.json      ← Buttons, Labels, Messages (SHARED)
│   │   ├── finance.json     ← Finance Manager, Expense Tracking
│   │   ├── planner.json     ← Daily Planner, Task Management
│   │   ├── journal.json     ← Digital Journal, Mood Tracking
│   │   ├── calendar.json    ← Smart Calendar, Events
│   │   ├── habit.json       ← Habit Tracker
│   │   ├── student.json     ← Student Solutions
│   │   ├── freelance.json   ← Freelancer Solutions
│   │   ├── growth.json      ← Personal Growth
│   │   ├── guide.json       ← Knowledge Base & Help
│   │   └── settings.json    ← User Profile & Settings
│   │
│   └── id/
│       ├── global.json
│       ├── auth.json
│       ├── common.json
│       ├── finance.json
│       ├── planner.json
│       ├── journal.json
│       ├── calendar.json
│       ├── habit.json
│       ├── student.json
│       ├── freelance.json
│       ├── growth.json
│       ├── guide.json
│       └── settings.json
```

## 🎯 Kategori Translation & Konten

### 1. **global.json** (47 keys)
- Navigasi utama (Home, About, Login, Register, Dashboard)
- Footer dan info legal
- Privasi & Syarat & Ketentuan (ToS)

### 2. **auth.json** (39 keys)
- Form Login & Register
- Password Reset
- OAuth Google
- Waitlist Mobile App

### 3. **common.json** (172 keys) ⭐ SHARED
- Button: Add, Save, Update, Delete, Cancel, Edit
- Validasi & Warning Messages
- Success & Error Messages
- Color Labels: Indigo, Sky, Emerald, Amber, Rose, Purple
- Konfirmasi Hapus
- Field Labels (umum)

### 4. **finance.json** (179 keys)
- Finance Manager Landing Page
- Kategori Pengeluaran
- Budget Management
- Transaction Recording
- Visualisasi & Analytics

### 5. **planner.json** (169 keys)
- Daily Planner Landing Page
- Time Blocking UI
- Task Management & Prioritas
- Focus Mode & Pomodoro
- Recurring Tasks

### 6. **habit.json** (existing in partials)
- Habit Tracker Landing Page
- Habit Creation & Management
- Streak & Gamification
- Habit Categories

### 7. **journal.json** (50 keys)
- Jurnal Digital Landing Page
- Mood Tracking Emoji
- Zen Mode Writing
- Jurnal History

### 8. **calendar.json** (74 keys)
- Smart Calendar Landing Page
- Event Management
- Time Zone Support
- Integrasi Habit, Task, Expense, Jurnal
- Color Coding

### 9. **student.json** (44 keys)
- Student Solutions Landing Page
- Copy untuk mahasiswa
- Fitur-fitur khusus mahasiswa

### 10. **freelance.json** (33 keys)
- Freelancer Solutions Landing Page
- Copy untuk freelancer
- Klien Management, Invoice Tracking

### 11. **growth.json** (45 keys)
- Personal Growth Landing Page
- Mindset Development
- Habit Building Framework

### 12. **guide.json** (42 keys)
- Knowledge Base & Help Center
- Tutorial & Panduan
- FAQ & Support

### 13. **settings.json** (26 keys)
- User Profile Settings
- Keamanan & Password
- Preferensi Aplikasi
- Pengaturan Modul

---

## 🔧 Cara Menggunakan di Laravel

### **Option 1: Auto-Loading (Recommended)**

Jika menggunakan Laravel 8+, copy semua file dari `lang/partials/en/` ke `lang/en/` dan dari `lang/partials/id/` ke `lang/id/`:

```bash
# Untuk English
cp lang/partials/en/*.json lang/en/

# Untuk Indonesian
cp lang/partials/id/*.json lang/id/
```

Kemudian hapus folder `lang/partials/` (opsional, untuk cleanup).

Sekarang gunakan translation dengan key namespace:
```php
// Di PHP
__('global.nav_home')
__('finance.finance_hero_title_1')
__('common.btn_save')

// Di Vue/JavaScript
trans('auth.auth_login_title')
```

### **Option 2: Manual Merge (Jika diperlukan)**

Jika Anda ingin tetap keep struktur `partials`, buat ServiceProvider untuk merge:

```php
// app/Providers/TranslationServiceProvider.php
<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class TranslationServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadTranslationsFrom(resource_path('lang/partials'), 'app');
    }
}
```

Kemudian register di `config/app.php`:
```php
'providers' => [
    // ...
    App\Providers\TranslationServiceProvider::class,
],
```

---

## 📝 Cara Menambah Translation Baru

### Langkah 1: Tentukan Kategori
Apakah translation baru termasuk kategori yang sudah ada (global, auth, finance, dll) atau perlu kategori baru?

### Langkah 2: Add Key ke File Yang Sesuai

Contoh: Menambah translation baru untuk Finance:
```json
// lang/partials/en/finance.json
{
    ...existing keys...,
    "finance_new_feature_title": "Export to CSV",
    "finance_new_feature_desc": "Download all transactions as CSV..."
}
```

### Langkah 3: Duplicate ke Bahasa Lain
Tambahkan key yang sama ke `lang/partials/id/finance.json` dengan terjemahan Indonesian:
```json
// lang/partials/id/finance.json
{
    ...existing keys...,
    "finance_new_feature_title": "Export ke CSV",
    "finance_new_feature_desc": "Unduh semua transaksi sebagai CSV..."
}
```

### Langkah 4: Gunakan di Code
```php
// Di Blade/Vue
{{ __('finance.finance_new_feature_title') }}
```

---

## ✅ Keuntungan Struktur Ini

✨ **Organized**
- Setiap kategori punya file terpisah
- Mudah menemukan & update translation

✨ **Scalable**
- Menambah bahasa baru hanya perlu duplikasi struktur
- Contoh: `lang/partials/zh/` untuk Chinese

✨ **Maintainable**
- Tidak ada mega-file 1500+ lines yang sulit dicari
- Clear hierarchy: Category → Keys

✨ **Team Friendly**
- Mudah assign translator per kategori
- Reduce merge conflicts

✨ **Performance**
- Lazy load translation per module saat diperlukan
- Better caching potential

---

## 🚀 Next Steps

1. Copy partials files ke lang/{en,id}/ folder (atau gunakan auto-load)
2. Update Vue components/Blade templates untuk reference new key structure
3. Test semua halaman untuk memastikan translation load dengan benar
4. Optional: Hapus backup file original en.json dan id.json

---

## 📞 Referensi File

| File | Keys | Purpose |
|------|------|---------|
| global.json | 47 | Navigation, Footer, Legal |
| auth.json | 39 | Authentication |
| common.json | 172 | Shared buttons/labels |
| finance.json | 179 | Finance module |
| planner.json | 169 | Planner/Task module |
| journal.json | 50 | Journal module |
| calendar.json | 74 | Calendar module |
| habit.json | ? | Habit module |
| student.json | 44 | Student landing page |
| freelance.json | 33 | Freelancer landing |
| growth.json | 45 | Growth module |
| guide.json | 42 | Help center |
| settings.json | 26 | User settings |

**Total: ~1000+ keys** (well-organized)

Terorganisir dengan baik untuk maintainability dan scalability! 🎉
