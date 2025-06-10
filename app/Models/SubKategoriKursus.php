<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubKategoriKursus extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function kategori()
    {
        return $this->belongsTo(KategoriKursus::class, 'kategori_kursus_id');
    }
}
