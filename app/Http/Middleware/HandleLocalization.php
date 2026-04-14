<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class HandleLocalization
{
    private const SUPPORTED_LOCALES = ["id", "en"];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = config("app.locale", "en");

        // 1) Crawler/user explicit query parameter (?hl=id|en)
        $queryLocale = $request->query("hl");
        if (in_array($queryLocale, self::SUPPORTED_LOCALES, true)) {
            $locale = $queryLocale;
            Session::put("locale", $locale);
        } elseif (Session::has("locale")) {
            // 2) Session (manual switch terbaru)
            $locale = Session::get("locale");
        } elseif (
            ($cookieLocale = $request->cookie("selected_locale")) &&
            in_array($cookieLocale, self::SUPPORTED_LOCALES, true)
        ) {
            // 3) Cookie persistence
            $locale = $cookieLocale;
            Session::put("locale", $locale);
        } else {
            // 4) Auto detect: prioritize country, then Accept-Language
            $country = strtoupper(
                (string) ($request->header("CF-IPCountry") ?:
                    $request->header("X-Vercel-IP-Country") ?:
                    $request->header("CloudFront-Viewer-Country") ?:
                    "")
            );

            if ($country === "ID") {
                $locale = "id";
            } else {
                $browserLocale = substr($request->getLanguages()[0] ?? "en", 0, 2);
                $locale = $browserLocale === "id" ? "id" : "en";
            }

            Session::put("locale", $locale);
        }

        App::setLocale($locale);

        $response = $next($request);

        // Pastikan cookie selalu sinkron dengan locale yang aktif
        if (method_exists($response, "cookie")) {
            $response->cookie("selected_locale", $locale, 60 * 24 * 30);
        }

        return $response;
    }
}