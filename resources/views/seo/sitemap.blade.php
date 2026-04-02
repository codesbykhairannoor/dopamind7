{!! '<?xml version="1.0" encoding="UTF-8"?>' !!}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
@foreach($pages as $page)
    <url>
        <loc>{{ $page['url'] }}</loc>
        <xhtml:link rel="alternate" hreflang="id" href="{{ $page['url'] }}{{ str_contains($page['url'], '?') ? '&' : '?' }}lang=id"/>
        <xhtml:link rel="alternate" hreflang="en" href="{{ $page['url'] }}{{ str_contains($page['url'], '?') ? '&' : '?' }}lang=en"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="{{ $page['url'] }}"/>
        <lastmod>{{ $page['lastmod'] ?? $date }}</lastmod>
        <changefreq>{{ $page['freq'] }}</changefreq>
        <priority>{{ $page['priority'] }}</priority>
    </url>
@endforeach
</urlset>
