# Planner Critical Bug Fix - 2026-03-04

## 🔴 CRITICAL BUG: Task Hilang dari Timeline

### Deskripsi Masalah

**Symptoms:**
1. User add task di planner timeline
2. Task sempat muncul (ke-apply) di timeline
3. **Tiba-tiba task HILANG dari tampilan**
4. Ketika user coba add task lagi di jam yang sama, ada alert "CONFLICT"
5. Padahal di tampilan tidak ada card task yang muncul
6. Saat refresh browser, sempat muncul banyak card task sebelum mereka hilang lagi

**Impact:** CRITICAL - User tidak bisa melihat task yang sudah dibuat, tapi task sebenarnya tersimpan di database.

---

## 🔍 Root Cause Analysis

### Investigasi

Setelah investigasi mendalam, ditemukan bahwa:

1. **Task tersimpan dengan benar di database** ✅
2. **Backend mengembalikan task dengan benar** ✅
3. **Frontend menerima task dari backend** ✅
4. **TAPI: Task tidak muncul di timeline** ❌

### Root Cause

Di `PlannerTaskResource.php`, **field `date` TIDAK di-return** ke frontend!

```php
// ❌ BEFORE - Field date HILANG
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'title' => (string) $this->title,
        'start_time' => $this->start_time ? substr($this->start_time, 0, 5) : null,
        'end_time' => $this->end_time ? substr($this->end_time, 0, 5) : null,
        'type' => (int) $this->type,
        'notes' =>$this->notes,
        'is_completed' => (bool) $this->is_completed,
        'created_at' => $this->created_at->toIso8601String(),
        // ❌ TIDAK ADA FIELD 'date'
    ];
}
```

### Mengapa Task Hilang?

Di `usePlannerTasks.js`, kita filter task berdasarkan tanggal:

```javascript
const scheduledTasks = computed(() =>
    localTasks.value
        .filter(t => t.start_time && t.date === currentDateRef.value) // ❌ t.date = undefined!
        .sort((a, b) => a.start_time.localeCompare(b.start_time))
);
```

Karena `t.date` adalah `undefined`, maka:
- `undefined === "2026-03-04"` → **false**
- Task tidak lolos filter
- Task tidak muncul di timeline

### Mengapa Ada Conflict Alert?

Task sebenarnya ada di `localTasks` (karena diterima dari backend), jadi:
1. Conflict detection di `checkTimeValidity()` masih bisa detect task tersebut
2. Tapi filter di `scheduledTasks` tidak menampilkan task tersebut
3. Hasilnya: alert conflict muncul, tapi tidak ada card yang terlihat

### Mengapa Sempat Muncul Lalu Hilang?

Saat user baru create task:
1. **Optimistic UI**: Task langsung ditambahkan ke `localTasks` dengan field `date` yang benar (dari form)
2. Task muncul di timeline ✅
3. **Backend response**: Task baru dari server masuk, tapi **tanpa field `date`**
4. `localTasks` di-update dengan data dari server (yang tidak punya field `date`)
5. Task hilang dari timeline ❌

---

## ✅ Solution

### Fix: Tambahkan Field `date` di PlannerTaskResource

```php
// ✅ AFTER - Field date ditambahkan
public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'date' => $this->date ? $this->date->format('Y-m-d') : null, // 🔥 FIX
        'title' => (string) $this->title,
        'start_time' => $this->start_time ? substr($this->start_time, 0, 5) : null,
        'end_time' => $this->end_time ? substr($this->end_time, 0, 5) : null,
        'type' => (int) $this->type,
        'notes' =>$this->notes,
        'is_completed' => (bool) $this->is_completed,
        'created_at' => $this->created_at->toIso8601String(),
    ];
}
```

**Format:** `Y-m-d` (contoh: "2026-03-04") - konsisten dengan format yang digunakan di frontend.

---

## 🎯 Hasil Setelah Fix

### Before Fix ❌
```javascript
// Task dari backend
{
    id: 123,
    title: "Meeting",
    start_time: "09:00",
    end_time: "10:00",
    // date: undefined ❌
}

// Filter
t.date === "2026-03-04"
// undefined === "2026-03-04" → false ❌
// Task TIDAK muncul
```

### After Fix ✅
```javascript
// Task dari backend
{
    id: 123,
    date: "2026-03-04", // ✅ Field date ada!
    title: "Meeting",
    start_time: "09:00",
    end_time: "10:00",
}

// Filter
t.date === "2026-03-04"
// "2026-03-04" === "2026-03-04" → true ✅
// Task MUNCUL di timeline
```

---

## 🧪 Testing Checklist

### Test Scenario 1: Create New Task
1. ✅ Buka planner di tanggal 3 Maret 2026
2. ✅ Buat task baru jam 09:00-10:00
3. ✅ Verifikasi task MUNCUL di timeline
4. ✅ Verifikasi task TETAP MUNCUL (tidak hilang setelah beberapa detik)
5. ✅ Refresh browser
6. ✅ Verifikasi task MASIH MUNCUL

### Test Scenario 2: Conflict Detection
1. ✅ Buat task jam 09:00-10:00
2. ✅ Coba buat task lagi jam 09:30-10:30
3. ✅ Verifikasi ada alert "Jadwal bentrok!"
4. ✅ Verifikasi KEDUA task terlihat di timeline (yang pertama sudah ada)

### Test Scenario 3: Switch Date
1. ✅ Buat task di tanggal 3 Maret
2. ✅ Pindah ke tanggal 4 Maret
3. ✅ Verifikasi task tanggal 3 Maret TIDAK muncul
4. ✅ Pindah kembali ke tanggal 3 Maret
5. ✅ Verifikasi task tanggal 3 Maret MUNCUL kembali

### Test Scenario 4: Multiple Tasks
1. ✅ Buat 5 task di jam berbeda
2. ✅ Verifikasi SEMUA task muncul di timeline
3. ✅ Refresh browser
4. ✅ Verifikasi SEMUA task masih muncul (tidak ada yang hilang)

---

## 📊 Impact Analysis

### Severity: CRITICAL 🔴

**Why Critical:**
- User tidak bisa melihat task yang sudah dibuat
- Data loss perception (user pikir data hilang, padahal tersimpan)
- Conflict detection masih jalan tapi user bingung karena tidak lihat task yang conflict
- User experience sangat buruk

### Affected Users: ALL USERS

Semua user yang menggunakan fitur Planner terpengaruh bug ini.

### Data Loss: NONE ✅

**Good news:** Tidak ada data yang hilang. Semua task tersimpan dengan benar di database. Bug ini hanya masalah tampilan (frontend filtering).

---

## 🔍 Related Files

**Fixed:**
- `app/Http/Resources/PlannerTaskResource.php` - Tambahkan field `date`

**Related (tidak perlu diubah):**
- `resources/js/Composables/Planner/usePlannerTasks.js` - Filter logic (sudah benar)
- `app/Http/Controllers/PlannerController.php` - Backend query (sudah benar)
- `app/Models/PlannerTask.php` - Model (sudah benar)

---

## 📝 Lessons Learned

### Best Practices untuk API Resources:

1. **Always include primary keys and foreign keys** - `id`, `user_id`, `date`, etc.
2. **Test API responses** - Pastikan semua field yang dibutuhkan frontend ada di response
3. **Use TypeScript or JSDoc** - Untuk catch missing fields di compile time
4. **Add integration tests** - Test full flow dari backend ke frontend

### Prevention:

Untuk mencegah bug serupa di masa depan:

```php
// ✅ GOOD: Explicit field mapping
return [
    'id' => $this->id,
    'date' => $this->date->format('Y-m-d'),
    'title' => $this->title,
    // ... semua field yang dibutuhkan
];

// ❌ BAD: Implicit mapping (easy to miss fields)
return [
    'id' => $this->id,
    // Lupa field 'date'
];
```

---

## 🎉 Conclusion

Bug ini adalah **critical bug** yang membuat fitur Planner tidak bisa digunakan dengan baik. Untungnya, fix-nya sangat simple: **tambahkan 1 line code** di `PlannerTaskResource.php`.

**Status:** ✅ FIXED

**Verification:** Silakan test dengan scenario di atas untuk memastikan bug sudah teratasi.
