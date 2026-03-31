const fs = require('fs');
const path = require('path');

const bPath = 'c:\\\\Users\\\\Axioo\\\\dopmymind\\\\resources\\\\views\\\\resources\\\\';
const idsPath = 'c:\\\\Users\\\\Axioo\\\\dopmymind\\\\lang\\\\partials\\\\id\\\\resources.json';
const ensPath = 'c:\\\\Users\\\\Axioo\\\\dopmymind\\\\lang\\\\partials\\\\en\\\\resources.json';

// --- DICTIONARIES ---
const newTranslationsID = {
    // CHANGELOG
    "chg_roadmap_title": "Peta Jalan Masa Depan",
    "chg_roadmap_desc": "Intip apa yang akan segera hadir di ekosistem kami.",
    "chg_roadmap_1": "Integrasi Neural",
    "chg_roadmap_1_d": "Koneksi langsung ke gelombang otak untuk produktivitas.",
    "chg_roadmap_2": "AI Asisten Pribadi",
    "chg_roadmap_2_d": "Otomatisasi seluruh jadwal Anda dengan 1 klik.",
    "chg_roadmap_3": "Gamifikasi Tingkat Dewa",
    "chg_roadmap_3_d": "Sistem level dan reward yang lebih masif.",
    "chg_feedback_title": "Suara Komunitas",
    "chg_feedback_desc": "Bagaimana pembaruan kami mengubah cara kerja Anda.",
    "chg_fd1": "\"Update 2.0 benar-benar mengubah cara saya bekerja!\"",
    "chg_fd2": "\"Kecepatan aplikasinya sekarang luar biasa.\"",
    "chg_beta_title": "Akses Beta Eksklusif",
    "chg_beta_desc": "Jadilah yang pertama mencoba fitur rahasia kami.",
    
    // COMMUNITY
    "com_mentors_title": "Temui Para Mentor",
    "com_mentors_desc": "Belajar langsung dari mereka yang telah membuktikan metode ini.",
    "com_mentor1": "Pakar Strategi Mental",
    "com_mentor2": "Arsitek Produktivitas",
    "com_mentor3": "Master Finansial",
    "com_global_title": "Jejaring Global",
    "com_global_desc": "Tersebar di lebih dari 50+ negara di seluruh dunia.",
    "com_stat1": "Anggota Aktif",
    "com_stat2": "Negara",
    "com_stat3": "Kolaborasi",
    "com_value_title": "Kenapa Jaringan Ini Berguna?",
    "com_value_desc": "Bukan sekadar grup chat, ini adalah akselerator kehidupan Anda.",
    
    // GUIDE
    "gui_playbooks_title": "Playbook Unggulan",
    "gui_playbooks_desc": "Panduan tuntas untuk menguasai setiap aspek sistem.",
    "gui_pb1": "Zero to Hero: Focus",
    "gui_pb2": "Financial Zen",
    "gui_video_title": "Masterclass Video",
    "gui_video_desc": "Lihat bagaimana metode ini diterapkan secara real-time.",
    "gui_vid_btn": "Tonton Sekarang",
    "gui_cert_title": "Jalur Sertifikasi",
    "gui_cert_desc": "Dapatkan pengakuan atas keahlian Anda dalam manajemen sistem.",
    "gui_step1": "Pahami Dasar",
    "gui_step2": "Implementasi",
    "gui_step3": "Evaluasi",
    
    // HELP
    "hlp_tuts_title": "Video Tutorial Pendek",
    "hlp_tuts_desc": "Pelajari fitur spesifik dalam waktu kurang dari 2 menit.",
    "hlp_cheat_title": "Lembar Sontekan (Cheatsheet)",
    "hlp_cheat_desc": "Jalan pintas ke produktivitas maksimal.",
    "hlp_ch1": "Sistem Shortcut Keyboard",
    "hlp_ch2": "Panduan Ritual Pagi",
    "hlp_sla_title": "Status Sistem & Keandalan",
    "hlp_sla_desc": "Kami memonitor server kami 24/7 untuk memastikan Anda selalu terhubung.",
    "hlp_sla1": "Uptime",
    "hlp_sla2": "Waktu Respon Rata-rata",
    
    // STORIES
    "sto_numbers_title": "Dampak Secara Angka",
    "sto_numbers_desc": "Bukan sekadar kata, ini adalah metrik kesuksesan para pengguna.",
    "sto_num1": "Jam Diselamatkan",
    "sto_num2": "Peningkatan Fokus",
    "sto_num3": "Persentase Target Tercapai",
    "sto_interviews_title": "Wawancara Terpilih",
    "sto_interviews_desc": "Menyelami pola pikir mereka yang revolusioner.",
    "sto_int1": "Bagaimana Sarah Menggandakan Pendapatannya",
    "sto_int2": "Rahasia Budi Bebas dari Burnout",
    "sto_hof_title": "Hall of Fame",
    "sto_hof_desc": "Penghargaan untuk pencapaian luar biasa komunitas."
};

const newTranslationsEN = {
    // CHANGELOG
    "chg_roadmap_title": "Future Roadmap",
    "chg_roadmap_desc": "Sneak peek into what's coming next to our ecosystem.",
    "chg_roadmap_1": "Neural Integration",
    "chg_roadmap_1_d": "Direct connection to brain waves for productivity.",
    "chg_roadmap_2": "AI Personal Assistant",
    "chg_roadmap_2_d": "Automate your entire schedule with 1 click.",
    "chg_roadmap_3": "God-level Gamification",
    "chg_roadmap_3_d": "More massive level and reward systems.",
    "chg_feedback_title": "Community Voices",
    "chg_feedback_desc": "How our updates are changing your workflow.",
    "chg_fd1": "\"The 2.0 update completely changed how I work!\"",
    "chg_fd2": "\"The app speed is incredible now.\"",
    "chg_beta_title": "Exclusive Beta Access",
    "chg_beta_desc": "Be the first to try out our secret features.",
    
    // COMMUNITY
    "com_mentors_title": "Meet the Mentors",
    "com_mentors_desc": "Learn directly from those who have proven this method.",
    "com_mentor1": "Mental Strategy Expert",
    "com_mentor2": "Productivity Architect",
    "com_mentor3": "Financial Master",
    "com_global_title": "Global Network",
    "com_global_desc": "Spread across 50+ countries worldwide.",
    "com_stat1": "Active Members",
    "com_stat2": "Countries",
    "com_stat3": "Collaborations",
    "com_value_title": "Why the Network Matters?",
    "com_value_desc": "Not just a chat group, it's a life accelerator.",
    
    // GUIDE
    "gui_playbooks_title": "Featured Playbooks",
    "gui_playbooks_desc": "Exhaustive guides to mastering every aspect of the system.",
    "gui_pb1": "Zero to Hero: Focus",
    "gui_pb2": "Financial Zen",
    "gui_video_title": "Video Masterclasses",
    "gui_video_desc": "See how the methods are applied in real-time.",
    "gui_vid_btn": "Watch Now",
    "gui_cert_title": "Certification Path",
    "gui_cert_desc": "Get recognized for your expertise in system management.",
    "gui_step1": "Understand Basics",
    "gui_step2": "Implementation",
    "gui_step3": "Evaluation",
    
    // HELP
    "hlp_tuts_title": "Short Video Tutorials",
    "hlp_tuts_desc": "Learn specific features in less than 2 minutes.",
    "hlp_cheat_title": "Cheatsheets",
    "hlp_cheat_desc": "Shortcuts to maximum productivity.",
    "hlp_ch1": "Keyboard Shortcuts System",
    "hlp_ch2": "Morning Rituals Guide",
    "hlp_sla_title": "System Status & Reliability",
    "hlp_sla_desc": "We monitor our servers 24/7 to ensure you are always connected.",
    "hlp_sla1": "Uptime",
    "hlp_sla2": "Average Response Time",
    
    // STORIES
    "sto_numbers_title": "Impact by Numbers",
    "sto_numbers_desc": "Not just words, these are the success metrics of our users.",
    "sto_num1": "Hours Saved",
    "sto_num2": "Focus Increase",
    "sto_num3": "Targets Reached",
    "sto_interviews_title": "Featured Interviews",
    "sto_interviews_desc": "Diving into the minds of the revolutionaries.",
    "sto_int1": "How Sarah Doubled Her Income",
    "sto_int2": "Budi's Secret to Beating Burnout",
    "sto_hof_title": "Hall of Fame",
    "sto_hof_desc": "Awards for outstanding community achievements."
};

// --- SNIPPETS TO INJECT ---
const snippets = {
    changelog: `
    {{-- SECTION: ROADMAP --}}
    <section class="py-24 bg-slate-900 border-y border-slate-800 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-30"></div>
        <div class="max-w-7xl mx-auto px-6 relative z-10">
            <h2 class="text-4xl md:text-5xl font-black mb-4">{{ __('resources.chg_roadmap_title') }}</h2>
            <p class="text-xl text-slate-400 mb-16">{{ __('resources.chg_roadmap_desc') }}</p>
            <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-1 p-8 rounded-3xl bg-slate-800 border-l-4 border-indigo-500 shadow-xl">
                    <h3 class="text-2xl font-bold mb-2">{{ __('resources.chg_roadmap_1') }}</h3>
                    <p class="text-slate-400">{{ __('resources.chg_roadmap_1_d') }}</p>
                </div>
                <div class="flex-1 p-8 rounded-3xl bg-slate-800 border-l-4 border-rose-500 shadow-xl">
                    <h3 class="text-2xl font-bold mb-2">{{ __('resources.chg_roadmap_2') }}</h3>
                    <p class="text-slate-400">{{ __('resources.chg_roadmap_2_d') }}</p>
                </div>
                <div class="flex-1 p-8 rounded-3xl bg-slate-800 border-l-4 border-emerald-500 shadow-xl">
                    <h3 class="text-2xl font-bold mb-2">{{ __('resources.chg_roadmap_3') }}</h3>
                    <p class="text-slate-400">{{ __('resources.chg_roadmap_3_d') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: FEEDBACK --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-black text-slate-900 mb-4">{{ __('resources.chg_feedback_title') }}</h2>
                <p class="text-xl text-slate-500">{{ __('resources.chg_feedback_desc') }}</p>
            </div>
            <div class="columns-1 md:columns-2 gap-8 space-y-8">
                <div class="break-inside-avoid p-10 bg-indigo-50 rounded-3xl">
                    <p class="text-xl italic font-bold text-slate-700 mb-4">{{ __('resources.chg_fd1') }}</p>
                    <span class="text-sm font-black text-indigo-600">@usera</span>
                </div>
                <div class="break-inside-avoid p-10 bg-rose-50 rounded-3xl">
                    <p class="text-xl italic font-bold text-slate-700 mb-4">{{ __('resources.chg_fd2') }}</p>
                    <span class="text-sm font-black text-rose-600">@userb</span>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: BETA ACCESS --}}
    <section class="py-32 bg-indigo-600 text-white text-center">
        <div class="max-w-4xl mx-auto px-6">
            <h2 class="text-5xl font-black mb-6">{{ __('resources.chg_beta_title') }}</h2>
            <p class="text-xl mb-10 text-indigo-100">{{ __('resources.chg_beta_desc') }}</p>
            <button class="bg-white text-indigo-900 px-8 py-4 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-2xl">Join Beta</button>
        </div>
    </section>
    `,
    community: `
    {{-- SECTION: MENTORS --}}
    <section class="py-24 bg-white border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-4xl font-black text-slate-900 mb-4">{{ __('resources.com_mentors_title') }}</h2>
            <p class="text-xl text-slate-500 mb-16">{{ __('resources.com_mentors_desc') }}</p>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="p-8 border border-slate-100 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-transform bg-slate-50">
                    <div class="w-20 h-20 rounded-full bg-indigo-100 mb-6 flex items-center justify-center text-2xl">🧠</div>
                    <h3 class="font-bold text-2xl mb-2">{{ __('resources.com_mentor1') }}</h3>
                </div>
                <div class="p-8 border border-slate-100 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-transform bg-slate-50">
                    <div class="w-20 h-20 rounded-full bg-emerald-100 mb-6 flex items-center justify-center text-2xl">⚡</div>
                    <h3 class="font-bold text-2xl mb-2">{{ __('resources.com_mentor2') }}</h3>
                </div>
                <div class="p-8 border border-slate-100 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-transform bg-slate-50">
                    <div class="w-20 h-20 rounded-full bg-amber-100 mb-6 flex items-center justify-center text-2xl">💰</div>
                    <h3 class="font-bold text-2xl mb-2">{{ __('resources.com_mentor3') }}</h3>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: GLOBAL NETWORK --}}
    <section class="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <h2 class="text-5xl font-black mb-6 z-10 text-center">{{ __('resources.com_global_title') }}</h2>
            <p class="text-xl text-slate-400 mb-16 z-10 text-center">{{ __('resources.com_global_desc') }}</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-16 w-full text-center z-10">
                <div>
                    <h4 class="text-7xl font-black text-indigo-400 mb-2">10k+</h4>
                    <p class="text-xl font-medium">{{ __('resources.com_stat1') }}</p>
                </div>
                <div>
                    <h4 class="text-7xl font-black text-emerald-400 mb-2">50+</h4>
                    <p class="text-xl font-medium">{{ __('resources.com_stat2') }}</p>
                </div>
                <div>
                    <h4 class="text-7xl font-black text-amber-400 mb-2">1M+</h4>
                    <p class="text-xl font-medium">{{ __('resources.com_stat3') }}</p>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: VALUE --}}
    <section class="py-24 bg-slate-50">
        <div class="max-w-5xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-black text-slate-900 mb-6">{{ __('resources.com_value_title') }}</h2>
            <p class="text-2xl text-slate-500 font-medium italic">{{ __('resources.com_value_desc') }}</p>
        </div>
    </section>
    `,
    guide: `
    {{-- SECTION: PLAYBOOKS --}}
    <section class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-5xl font-black text-slate-900 mb-4">{{ __('resources.gui_playbooks_title') }}</h2>
            <p class="text-xl text-slate-500 mb-16">{{ __('resources.gui_playbooks_desc') }}</p>
            <div class="flex gap-8 overflow-x-auto pb-8 snap-x">
                <div class="min-w-[300px] md:min-w-[400px] bg-slate-900 text-white p-12 rounded-[3rem] snap-start hover:scale-[1.02] transition-transform">
                    <div class="w-16 h-16 bg-white/20 rounded-2xl mb-8"></div>
                    <h3 class="text-3xl font-black mb-4">{{ __('resources.gui_pb1') }}</h3>
                </div>
                <div class="min-w-[300px] md:min-w-[400px] bg-indigo-600 text-white p-12 rounded-[3rem] snap-start hover:scale-[1.02] transition-transform">
                    <div class="w-16 h-16 bg-white/20 rounded-2xl mb-8"></div>
                    <h3 class="text-3xl font-black mb-4">{{ __('resources.gui_pb2') }}</h3>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: VIDEO MASTERCLASSES --}}
    <section class="py-24 bg-slate-50 border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-black text-slate-900 mb-4">{{ __('resources.gui_video_title') }}</h2>
                <p class="text-xl text-slate-500">{{ __('resources.gui_video_desc') }}</p>
            </div>
            <div class="w-full h-96 bg-black rounded-[3rem] overflow-hidden relative shadow-2xl flex items-center justify-center group cursor-pointer">
                <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-125 transition-transform">
                    <div class="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: CERTIFICATION --}}
    <section class="py-32 bg-white">
        <div class="max-w-5xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-black mb-16">{{ __('resources.gui_cert_title') }}</h2>
            <div class="flex flex-col md:flex-row items-center justify-center gap-4 text-xl font-bold">
                <div class="bg-indigo-50 text-indigo-600 px-8 py-4 rounded-full">{{ __('resources.gui_step1') }}</div>
                <div class="hidden md:block">➔</div>
                <div class="bg-indigo-50 text-indigo-600 px-8 py-4 rounded-full">{{ __('resources.gui_step2') }}</div>
                <div class="hidden md:block">➔</div>
                <div class="bg-indigo-50 text-indigo-600 px-8 py-4 rounded-full">{{ __('resources.gui_step3') }}</div>
            </div>
        </div>
    </section>
    `,
    help: `
    {{-- SECTION: VIDEO TUTORIALS --}}
    <section class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-4xl font-black text-slate-900 mb-4 text-center">{{ __('resources.hlp_tuts_title') }}</h2>
            <p class="text-xl text-slate-500 mb-16 text-center">{{ __('resources.hlp_tuts_desc') }}</p>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="h-48 bg-slate-200 rounded-3xl flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer">▶</div>
                <div class="h-48 bg-slate-200 rounded-3xl flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer">▶</div>
                <div class="h-48 bg-slate-200 rounded-3xl flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer">▶</div>
            </div>
        </div>
    </section>

    {{-- SECTION: CHEATSHEETS --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-4xl font-black text-slate-900 mb-4">{{ __('resources.hlp_cheat_title') }}</h2>
            <p class="text-xl text-slate-500 mb-16">{{ __('resources.hlp_cheat_desc') }}</p>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="p-10 border-2 border-dashed border-indigo-200 rounded-[2rem] bg-indigo-50/30 hover:bg-indigo-50 transition">
                    <h3 class="text-2xl font-bold text-indigo-900 mb-2">{{ __('resources.hlp_ch1') }}</h3>
                </div>
                <div class="p-10 border-2 border-dashed border-emerald-200 rounded-[2rem] bg-emerald-50/30 hover:bg-emerald-50 transition">
                    <h3 class="text-2xl font-bold text-emerald-900 mb-2">{{ __('resources.hlp_ch2') }}</h3>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: SYSTEM STATUS --}}
    <section class="py-24 bg-slate-900 text-white">
        <div class="max-w-5xl mx-auto px-6 text-center">
            <h2 class="text-4xl font-black mb-4">{{ __('resources.hlp_sla_title') }}</h2>
            <p class="text-xl text-slate-400 mb-16">{{ __('resources.hlp_sla_desc') }}</p>
            <div class="flex flex-col md:flex-row justify-center gap-16 gap-y-8">
                <div>
                    <h4 class="text-6xl font-black text-emerald-400 mb-2">99.9%</h4>
                    <p class="text-lg">{{ __('resources.hlp_sla1') }}</p>
                </div>
                <div>
                    <h4 class="text-6xl font-black text-indigo-400 mb-2">< 50ms</h4>
                    <p class="text-lg">{{ __('resources.hlp_sla2') }}</p>
                </div>
            </div>
        </div>
    </section>
    `,
    stories: `
    {{-- SECTION: BY THE NUMBERS --}}
    <section class="py-32 bg-indigo-600 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h2 class="text-5xl font-black mb-4">{{ __('resources.sto_numbers_title') }}</h2>
            <p class="text-xl text-indigo-200 mb-20">{{ __('resources.sto_numbers_desc') }}</p>
            <div class="grid md:grid-cols-3 gap-12">
                <div>
                    <div class="text-7xl font-black mb-4 shadow-sm text-white">2M+</div>
                    <div class="text-xl font-bold text-indigo-200 uppercase tracking-widest">{{ __('resources.sto_num1') }}</div>
                </div>
                <div>
                    <div class="text-7xl font-black mb-4 shadow-sm text-white">315%</div>
                    <div class="text-xl font-bold text-indigo-200 uppercase tracking-widest">{{ __('resources.sto_num2') }}</div>
                </div>
                <div>
                    <div class="text-7xl font-black mb-4 shadow-sm text-white">99%</div>
                    <div class="text-xl font-bold text-indigo-200 uppercase tracking-widest">{{ __('resources.sto_num3') }}</div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: FEATURED INTERVIEWS --}}
    <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-4xl font-black text-slate-900 mb-4">{{ __('resources.sto_interviews_title') }}</h2>
            <p class="text-xl text-slate-500 mb-16">{{ __('resources.sto_interviews_desc') }}</p>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="h-80 rounded-[3rem] bg-slate-900 overflow-hidden relative group">
                    <img src="https://i.pravatar.cc/400?u=sarah" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"/>
                    <div class="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-slate-900 to-transparent">
                        <h3 class="text-2xl font-black text-white">{{ __('resources.sto_int1') }}</h3>
                    </div>
                </div>
                <div class="h-80 rounded-[3rem] bg-indigo-900 overflow-hidden relative group">
                    <img src="https://i.pravatar.cc/400?u=budi" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"/>
                    <div class="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-indigo-900 to-transparent">
                        <h3 class="text-2xl font-black text-white">{{ __('resources.sto_int2') }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- SECTION: HALL OF FAME --}}
    <section class="py-32 bg-slate-50">
        <div class="max-w-7xl mx-auto px-6 text-center">
            <h2 class="text-5xl font-black text-slate-900 mb-6">{{ __('resources.sto_hof_title') }}</h2>
            <p class="text-xl text-slate-500 mb-16">{{ __('resources.sto_hof_desc') }}</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="h-40 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-4"><span class="font-black text-lg text-slate-300">Winner 1</span></div>
                <div class="h-40 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-4"><span class="font-black text-lg text-slate-300">Winner 2</span></div>
                <div class="h-40 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-4"><span class="font-black text-lg text-slate-300">Winner 3</span></div>
                <div class="h-40 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-center p-4"><span class="font-black text-lg text-slate-300">Winner 4</span></div>
            </div>
        </div>
    </section>
    `
};

const pages = ['changelog.blade.php', 'community.blade.php', 'guide.blade.php', 'help.blade.php', 'stories.blade.php'];

for (const p of pages) {
    const fPath = path.join(bPath, p);
    let content = fs.readFileSync(fPath, 'utf8');
    
    // Temukan bagian terakhir sebelum @endsection yang merupakan CTA
    // Biasanya ini bagian <section ... {{-- SECTION ...CTA --}}
    const sectionCommentIndices = [...content.matchAll(/\{\{--\s*SECTION.*?\s*--\}\}/gi)].map(m => m.index);
    if (sectionCommentIndices.length > 0) {
        // Ambil index section komen TERAKHIR
        const lastSectionIndex = sectionCommentIndices[sectionCommentIndices.length - 1];
        
        const snippetName = p.split('.')[0];
        const snippetToInject = snippets[snippetName];
        
        content = content.substring(0, lastSectionIndex) + snippetToInject + '\\n\\n    ' + content.substring(lastSectionIndex);
        fs.writeFileSync(fPath, content, 'utf8');
        console.log('Updated ' + p);
    }
}

// UPDATE JSON FILES
const updateJSON = (fpath, newKeys) => {
    let raw = fs.readFileSync(fpath, 'utf8');
    let data = JSON.parse(raw);
    data = { ...data, ...newKeys };
    fs.writeFileSync(fpath, JSON.stringify(data, null, 4), 'utf8');
};

updateJSON(idsPath, newTranslationsID);
updateJSON(ensPath, newTranslationsEN);
console.log('JSON updated');
