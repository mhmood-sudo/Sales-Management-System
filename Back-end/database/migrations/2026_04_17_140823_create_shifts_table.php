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
        Schema::create('shifts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained();
    $table->timestamp('start_at')->nullable();
    $table->timestamp('end_at')->nullable();
    $table->decimal('initial_cash', 10, 2)->default(0);
    $table->decimal('final_cash', 10, 2)->nullable();
    $table->enum('status', ['open', 'closed'])->default('open');
    $table->unsignedBigInteger('sale_id')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts');
    }
};
