@props(['href', 'icon', 'title', 'desc'])

<a href="{{ $href }}" class="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition group">
    <div class="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition duration-300">
        {{ $icon }}
    </div>
    <div>
        <h4 class="text-sm font-black text-slate-900 mb-0.5 group-hover:text-indigo-600 transition">{{ $title }}</h4>
        @if($desc)
            <p class="text-[11px] text-slate-500 font-medium leading-tight line-clamp-1">{{ $desc }}</p>
        @endif
    </div>
</a>