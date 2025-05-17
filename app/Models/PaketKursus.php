<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaketKursus extends Model
{
    use HasFactory;
    protected $fillable = [
        'kd_paket',
        'nama_paket',
        'kategori_kursus',
        'sub_kategori_kursus',
        'jenis_kursus',
        'deskripsi',
        'thumbnail',
        'total_pertemuan',
        'total_materi',
        'harga',
        'status'
    ];

    public function detail()
    {
        return $this->hasMany(DetailPaketKursus::class, 'paket_kursus_id');
    }
}
