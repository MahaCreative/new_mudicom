<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisKursus extends Model
{
    use HasFactory;
    protected $fillable = [
        'jenis_kursus',
        'deskripsi',
        'thumbnail',
    ];
    public function benefit()
    {
        return $this->hasMany(BenefitJenisKursus::class, 'jenis_kursus_id');
    }
}
