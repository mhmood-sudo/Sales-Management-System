<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'أدوية عامة'],
            ['name' => 'مضادات حيوية'],
            ['name' => 'مسكنات'],
            ['name' => 'مستلزمات طبية'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
