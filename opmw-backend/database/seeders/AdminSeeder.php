<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::firstOrCreate(
            ['email' => 'admin@opmw.in'],
            [
                'name' => 'OPMW Admin',
                'email' => 'admin@opmw.in',
                'password' => Hash::make('admin@opmw2024'),
            ]
        );
    }
}
