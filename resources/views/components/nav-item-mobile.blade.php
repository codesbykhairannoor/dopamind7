@props(['href', 'icon', 'title', 'desc' => ''])

<a href="{{ $href }}" @if($attributes->has('dismiss-mobile')) @click="$dispatch('mobile-nav-close')" @endif class="flex items-start gap-3 py-2.5 px-1 rounded-lg hover:bg-slate-50 active:bg-slate-100/80 transition-colors">
    <div class="w-9 h-9 shrink-0 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-lg shadow-sm">
        {{ $icon }}
    </div>
    <div class="min-w-0 flex-1 pt-0.5">
        <p class="font-semibold text-slate-900 text-[13px] leading-snug">{{ $title }}</p>
        @if($desc !== '')
            <p class="text-[12px] text-slate-500 font-normal leading-snug mt-0.5 line-clamp-2">{{ $desc }}</p>
        @endif
    </div>
</a>
