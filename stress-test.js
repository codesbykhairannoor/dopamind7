import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// 1. Load data token dari file JSON
const users = new SharedArray('users', function () {
  return JSON.parse(open('./stress_tokens.json'));
});

// 2. Konfigurasi test
export const options = {
  vus: 50,           // 50 Virtual Users bersamaan
  duration: '30s',   // Durasi test 30 detik
  thresholds: {
    // Target: 99% request HARUS sukses
    http_req_failed: ['rate<0.01'], 
    // Target: 95% respon server harus di bawah 2 detik
    http_req_duration: ['p(95)<2000'], 
  },
};

export default function () {
  // Ambil user acak dari daftar token
  const randomUser = users[Math.floor(Math.random() * users.length)];

  const urlTx = 'http://127.0.0.1:8000/api/stress/transaction';
  const urlJournal = 'http://127.0.0.1:8000/api/stress/journal';

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${randomUser.token}`,
    },
  };

  // Kirim request transaksi dan jurnal secara batch
  const responses = http.batch([
    ['POST', urlTx, JSON.stringify({}), params],
    ['POST', urlJournal, JSON.stringify({}), params],
  ]);

  // ==========================================
  // FITUR DEBUGGING: Menampilkan Pesan Error
  // ==========================================
  if (responses[0].status !== 201) {
    console.log(`Error Transaksi (${randomUser.user_id}): ${responses[0].status} - ${responses[0].body}`);
  }
  
  if (responses[1].status !== 201) {
    console.log(`Error Jurnal (${randomUser.user_id}): ${responses[1].status} - ${responses[1].body}`);
  }

  // Cek fungsionalitas untuk laporan hasil di akhir
  check(responses[0], { 'Transaksi berhasil dibuat (201)': (r) => r.status === 201 });
  check(responses[1], { 'Jurnal berhasil dibuat (201)': (r) => r.status === 201 });

  // Jeda simulasi agar tidak terlalu membombardir server
  sleep(2); 
}