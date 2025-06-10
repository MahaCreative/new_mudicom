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
        Schema::create('reason_pakets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paket_kursus_id')->constrained('paket_kursuses')->onDelete('cascade');
            $table->string('icon');
            $table->string('reason');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reason_pakets');
    }
};
