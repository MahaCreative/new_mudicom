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
        Schema::create('jenis_kursuses', function (Blueprint $table) {
            $table->id();
            $table->string('jenis_kursus');
            $table->longText('deskripsi');
            $table->string('thumbnail')->default('image/default_thumnbnail.jpg');
            $table->string('status_konfirmasi')->default('menunggu konfirmasi');
            $table->bigInteger('views')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jenis_kursuses');
    }
};
