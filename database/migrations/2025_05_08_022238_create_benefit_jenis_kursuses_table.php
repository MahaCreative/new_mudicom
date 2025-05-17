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
        Schema::create('benefit_jenis_kursuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jenis_kursus_id')->constrained('jenis_kursuses')->onDelete('cascade');
            $table->string('benefit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('benefit_jenis_kursuses');
    }
};
