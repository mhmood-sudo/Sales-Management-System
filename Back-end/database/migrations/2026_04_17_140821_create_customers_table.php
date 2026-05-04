<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('phone', 20)->nullable();
    $table->boolean('is_frozen')->default(false);
    $table->decimal('credit_limit', 10, 2)->default(0);
    $table->decimal('current_balance', 10, 2)->default(0);
    $table->enum('role', ['regular', 'vip'])->default('regular');
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
