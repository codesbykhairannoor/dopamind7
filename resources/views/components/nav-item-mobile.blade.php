@props(['href', 'icon', 'title', 'desc' => ''])

<a href="{{ $href }}" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors">
    <div class="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-sm">
        {{ $icon }}
    </div>
    <div class="min-w-0">
        <p class="font-black text-slate-800 text-sm leading-tight">{{ $title }}</p>
        @if($desc !== '')
            <p class="text-[11px] text-slate-500 font-semibold truncate">{{ $desc }}</p>
        @endif
    </div>
</a>
