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
        Schema::create('fun_facts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('paket_kursus_id')->constrained('paket_kursuses')->onDelete('cascade');
            $table->string('image_funfact');
            $table->text('deskripsi_funfact');
            $table->string('image_posisi')->default('right');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fun_facts');
    }
};
