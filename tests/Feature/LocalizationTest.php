<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Session;
use Tests\TestCase;

class LocalizationTest extends TestCase
{
    // no database needed for these checks

    public function test_language_switch_plain_redirect()
    {
        $response = $this->get('/lang/id');
        $response->assertRedirect('/');
        $this->assertEquals('id', session('locale'));
    }

    public function test_language_switch_inertia_request()
    {
        $response = $this->withHeaders([
            'X-Inertia' => 'true',
            'Accept' => 'application/json',
        ])->get('/lang/id');

        // Laravel/Inertia may return a straight 302 or convert it to a 409 with
        // the X-Inertia-Location header. Accept either.
        $this->assertTrue(in_array($response->status(), [302, 409]));
        $this->assertTrue(
            $response->headers->has('Location') ||
            $response->headers->has('X-Inertia-Location')
        );
        $this->assertEquals('id', session('locale'));
    }
}
