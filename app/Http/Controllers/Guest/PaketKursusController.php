<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\BenefitJenisKursus;
use App\Models\JenisKursus;
use App\Models\KategoriKursus;
use App\Models\PaketKursus;
use Illuminate\Http\Request;

class PaketKursusController extends Controller
{
    public function index(Request $request)
    {
        $kategori = KategoriKursus::latest()->get();
        $query = PaketKursus::query();
        $paket = $query->latest()->get();

        return inertia('Guest/PaketKursus/Index', compact('paket', 'kategori'));
    }

    public function show(Request $request, $slug)
    {
        $paket = PaketKursus::with(
            'reason',
            'trouble',
            'solusi',
            'kriteria',
            'funfact',
        )->where('slug', $slug)->first();
        $jenis = JenisKursus::where('jenis_kursus', $paket->jenis_kursus)->first();
        $benefit = BenefitJenisKursus::where('jenis_kursus_id', $jenis->id)->latest()->get();

        return inertia('Guest/PaketKursus/Show', compact('paket', 'benefit', 'jenis'));
    }
}
