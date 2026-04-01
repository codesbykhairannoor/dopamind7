<div x-data="{ 
        show: false,
        init() {
            const dbConsent = @js(auth()->check() ? auth()->user()->cookie_consent : null);
            const localConsent = localStorage.getItem('cookie_consent');
            
            if (!dbConsent && !localConsent) {
                setTimeout(() => this.show = true, 2000);
            }
        },
        async accept() {
            this.save('all');
        },
        async essential() {
            this.save('essential');
        },
        async save(type) {
            localStorage.setItem('cookie_consent', type);
            this.show = false;

            // Update Google Tag Consent Mode
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'ad_storage': type === 'all' ? 'granted' : 'denied',
                    'analytics_storage': type === 'all' ? 'granted' : 'denied',
                    'personalization_storage': type === 'all' ? 'granted' : 'denied'
                });
            }

            if (@js(auth()->check())) {
                try {
                    await fetch('{{ route('settings.cookie-consent') }}', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': '{{ csrf_token() }}'
                        },
                        body: JSON.stringify({ consent: type })
                    });
                } catch (e) {
                    console.error('Consent sync failed');
                }
            }
        }
    }" x-show="show" x-transition:enter="transition ease-out duration-500"
    x-transition:enter-start="opacity-0 translate-y-20 scale-95"
    x-transition:enter-end="opacity-100 translate-y-0 scale-100" x-transition:leave="transition ease-in duration-300"
    x-transition:leave-start="opacity-100 translate-y-0 scale-100"
    x-transition:leave-end="opacity-0 translate-y-20 scale-95"
    class="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[200]" x-cloak>
    <div
        class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative overflow-hidden group">
        {{-- Decorative Blur --}}
        <div
            class="absolute -right-20 -top-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-700">
        </div>

        <div class="relative z-10">
            <div class="flex items-start gap-4 mb-6">
                <div
                    class="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-indigo-200 shrink-0">
                    🍪
                </div>
                <div>
                    <h3 class="text-lg font-black text-slate-900 dark:text-white mb-1">
                        {{ __('cookie_title') }}
                    </h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                        {{ __('cookie_desc') }}
                    </p>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <button @click="accept()"
                    class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs transition transform active:scale-95 shadow-lg shadow-indigo-100 dark:shadow-none">
                    {{ __('cookie_btn_accept') }}
                </button>
                <div class="grid grid-cols-2 gap-2">
                    <button @click="essential()"
                        class="py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[10px] transition">
                        {{ __('cookie_btn_essential') }}
                    </button>
                    <a href="{{ route('company.privacy') }}"
                        class="py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[10px] transition text-center">
                        {{ __('cookie_btn_settings') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>