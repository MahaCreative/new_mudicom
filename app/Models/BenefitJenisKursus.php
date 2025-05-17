<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BenefitJenisKursus extends Model
{
    use HasFactory;
    protected $fillable = [
        'jenis_kursus_id',
        'benefit',
    ];
}
