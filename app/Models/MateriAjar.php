<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MateriAjar extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function kategori()
    {
        return $this->belongsTo(SubKategoriKursus::class, 'sub_kategrori_id');
    }
}
