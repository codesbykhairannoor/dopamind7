@props(['href', 'icon', 'title'])

<a href="{{ $href }}" class="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors">
    <div class="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-2xl shadow-sm">
        {{ $icon }}
    </div>
    <span class="font-bold text-slate-700 text-lg">{{ $title }}</span>
</a>