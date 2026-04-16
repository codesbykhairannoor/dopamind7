@props(['href', 'icon', 'title', 'desc' => ''])

<a href="{{ $href }}" 
   @click="mobileMenuOpen = false"
   class="flex items-start gap-4 py-3 px-2 rounded-xl hover:bg-slate-50 active:bg-slate-100/80 transition-colors">
    <div class="w-10 h-10 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xl shadow-sm">
        {{ $icon }}
    </div>
    <div class="min-w-0 flex-1 pt-0.5">
        <p class="font-bold text-slate-900 text-[16px] leading-tight">{{ $title }}</p>
        @if($desc !== '')
            <p class="text-[13px] text-slate-500 font-medium leading-snug mt-1 line-clamp-2">{{ $desc }}</p>
        @endif
    </div>
</a>
