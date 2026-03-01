<?php
/**
 * Translation Loader Configuration
 * 
 * File ini membantu Laravel mengload translation dari struktur partials
 * yang telah diorganisir berdasarkan kategori fitur.
 * 
 * USAGE:
 * 1. Letakkan file ini di app/Helpers/ atau services folder
 * 2. Call function ini di boot ServiceProvider untuk merge translations
 * 3. Atau copy langsung file-file dari partials ke lang/{locale}/
 */

namespace App\Helpers;

use Illuminate\Support\Facades\File;

class TranslationLoader
{
    /**
     * Load dan merge semua translation partials dari folder lang/partials/
     * 
     * @param string $locale - Bahasa: 'en' atau 'id'
     * @return array - Translation yang sudah di-merge
     */
    public static function loadPartials($locale = 'en')
    {
        $basePath = resource_path("lang/partials/{$locale}");
        $translations = [];

        if (!File::exists($basePath)) {
            return $translations;
        }

        $files = File::files($basePath);

        foreach ($files as $file) {
            if ($file->getExtension() === 'json') {
                $key = str_replace('.json', '', $file->getFilename());
                $translations[$key] = json_decode(
                    File::get($file->getPathname()),
                    true
                );
            }
        }

        return $translations;
    }

    /**
     * Merge semua partials menjadi single array
     * 
     * @param string $locale
     * @return array
     */
    public static function mergeAllPartials($locale = 'en')
    {
        $partials = self::loadPartials($locale);
        $merged = [];

        foreach ($partials as $category => $keys) {
            foreach ($keys as $key => $value) {
                $merged["{$category}.{$key}"] = $value;
            }
        }

        return $merged;
    }
}

/**
 * ALTERNATIVE: Gunakan artisan command untuk copy files
 * 
 * php artisan tinker
 * File::copy(resource_path('lang/partials/en/global.json'), resource_path('lang/en/global.json'));
 * // Copy untuk semua files di en folder
 * // Repeat untuk id folder
 * 
 * Atau gunakan shell script:
 * cp lang/partials/en/*.json lang/en/
 * cp lang/partials/id/*.json lang/id/
 */
?>
