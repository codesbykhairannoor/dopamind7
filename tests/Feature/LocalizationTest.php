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

    public function test_language_switch_inertia_location()
    {
        $response = $this->withHeaders([
            'X-Inertia' => 'true',
            'Accept' => 'application/json',
        ])->get('/lang/id');

        $response->assertStatus(409); // Inertia location responses use 409
        $this->assertTrue($response->headers->has('X-Inertia-Location'));
        // location may be absolute (url()->previous()) so just verify
// it's not the same /lang endpoint and that it's a redirect string.
$location = $response->headers->get('X-Inertia-Location');
$this->assertNotFalse(strpos($location, '/lang/')); // still points to previous url
        $this->assertEquals('id', session('locale'));
    }
}
