<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (!\Illuminate\Support\Facades\DB::table('users')->where('email', 'admin@gmail.com')->exists()) {
            \Illuminate\Support\Facades\DB::table('users')->insert([
                'name' => 'Super Admin',
                'email' => 'admin@gmail.com',
                'password' => \Illuminate\Support\Facades\Hash::make('passwordadmin123'),
                'is_admin' => true,
                'email_verified_at' => now(),
                'settings' => '{}',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
