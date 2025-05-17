<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailPaketKursus extends Model
{
    use HasFactory;
    protected $fillable = [
        'paket_kursus_id',
        'nama_materi',
        'jmlh_pertemuan',
    ];
}
