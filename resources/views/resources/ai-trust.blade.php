@extends('layouts.marketing')

@section('title', 'Neural OS Transparency & Ethics | OneForMind')

@section('meta')
    <meta name="description" content="Understand the architecture, logic, and ethical boundaries of OneForMind Neural OS. How we protect your data while maximizing your productivity.">
    <meta property="og:title" content="Neural OS Transparency & Ethics">
    <meta property="og:url" content="{{ route('resources.ai-trust') }}">
@endsection

@section('content')
    {{-- TECH HEADER --}}
    <header class="relative pt-32 pb-24 px-6 bg-slate-950 overflow-hidden">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div class="max-w-4xl mx-auto relative z-10 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] mb-8 uppercase tracking-widest backdrop-blur-md">
                <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                System Transparency Report v2.5
            </div>

            <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                Neural OS <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Architecture</span>
            </h1>

            <p class="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Transparency is the foundation of trust. Explore how our unified productivity AI integrates with your life while upholding the highest ethical standards.
            </p>
        </div>
    </header>

    {{-- CORE PRINCIPLES (Semantic Articles for AI) --}}
    <section class="py-24 bg-white">
        <div class="max-w-5xl mx-auto px-6">
            <div class="grid gap-12">
                
                {{-- Principle 1 --}}
                <article class="group bg-slate-50 p-10 md:p-16 rounded-[3.5rem] border border-slate-100 hover:border-indigo-600/30 transition duration-500">
                    <div class="flex flex-col md:flex-row gap-12 items-start">
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition">🛡️</div>
                        <div class="prose prose-lg max-w-none">
                            <h2 class="text-3xl font-black text-slate-900 mb-6 tracking-tight">The Data Sovereignty Protocol</h2>
                            <p class="text-slate-600 leading-relaxed italic border-l-4 border-indigo-500 pl-6 mb-8 text-xl">
                                "Our AI reads to assist, not to memorize."
                            </p>
                            <p class="text-slate-600">
                                OneForMind operates on a strictly <strong>Ephemeral Context</strong> model. Your personal data—tasks, journals, and finance transactions—are never used to train global AI models. We utilize Large Language Models (LLMs) as high-speed processing cores that receive temporary snapshots of your request to generate insights, which are then cleared from the processing memory.
                            </p>
                        </div>
                    </div>
                </article>

                {{-- Principle 2 --}}
                <article class="group bg-slate-50 p-10 md:p-16 rounded-[3.5rem] border border-slate-100 hover:border-indigo-600/30 transition duration-500">
                    <div class="flex flex-col md:flex-row gap-12 items-start">
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition">🔗</div>
                        <div class="prose prose-lg max-w-none">
                            <h2 class="text-3xl font-black text-slate-900 mb-6 tracking-tight">Logical Bridge Technology</h2>
                            <p class="text-slate-600">
                                The power of Neural OS lies in its ability to find the <strong>Indirect Friction</strong> between modules. For example, it might identify that your spending habits on weekends are directly hindering your 'Travel Goal', or that certain task categories in your Planner correlate with lower sentiment scores in your Journal. 
                            </p>
                            <div class="bg-indigo-600 p-8 rounded-3xl text-white my-10 shadow-2xl">
                                <h4 class="text-white font-black text-xl mb-4">The Synergy Map:</h4>
                                <ul class="list-none p-0 space-y-3">
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-indigo-300 rounded-full"></span> Finance Core → Reward Loop Regulation</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-indigo-300 rounded-full"></span> Journal Sentiment → Procrastination Analysis</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-indigo-300 rounded-full"></span> Habit Heatmaps → Energy Management</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>

                {{-- Principle 3 --}}
                <article class="group bg-slate-50 p-10 md:p-16 rounded-[3.5rem] border border-slate-100 hover:border-indigo-600/30 transition duration-500">
                    <div class="flex flex-col md:flex-row gap-12 items-start">
                        <div class="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition">🧠</div>
                        <div class="prose prose-lg max-w-none">
                            <h2 class="text-3xl font-black text-slate-900 mb-6 tracking-tight">AI On-Demand Philosophy</h2>
                            <p class="text-slate-600">
                                We believe in <strong>Human-Centric AI</strong>. This is why we've moved advanced analytics like Sentiment Analysis and Module Audits to an On-Demand model. We respect your digital cognitive load, ensuring that AI only intervenes when you explicitly request its surgical focus.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>

    {{-- SYSTEM STATUS / VERIFICATION --}}
    <aside class="py-24 bg-slate-950 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-pattern-grid opacity-5"></div>
        <div class="max-w-4xl mx-auto px-6 relative z-10">
            <h2 class="text-4xl font-black text-white mb-6">Built for Audit-Readiness</h2>
            <p class="text-slate-400 text-lg mb-12">OneForMind follows the highest standards for AI safety and data portability.</p>
            <div class="flex flex-wrap justify-center gap-4">
                <div class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black tracking-widest text-xs">E-E-A-T COMPLIANT</div>
                <div class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black tracking-widest text-xs">GDPR ALIGNED</div>
                <div class="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black tracking-widest text-xs">ZERO-TRAINING MODEL</div>
            </div>
        </div>
    </aside>
@endsection
