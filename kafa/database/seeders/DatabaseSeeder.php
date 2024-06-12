<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test2@aididhaiqal.com',
            'role' => 'admin',
            'password'=> bcrypt('password'),
        ]);


        User::factory()->create([
            'name' => 'Test User',
            'email' => 'teacher@aididhaiqal.com',
            'role' => 'teacher',
            'password'=> bcrypt('password'),
        ]);

    }
}
