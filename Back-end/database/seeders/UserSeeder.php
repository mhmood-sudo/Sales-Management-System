<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
public function run(): void
{
    \App\Models\User::create([
        'name' => 'Admin User',
        'username' => 'admin',
        'password' => bcrypt('123456'),
        'status' => 'active',
        'role' => 'admin',
    ]);
}
}
