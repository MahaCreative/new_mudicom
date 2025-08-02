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

        $params_kategori = $request->kategori ? $request->kategori : 'all';
        $kategori = KategoriKursus::latest()->get();
        $query = PaketKursus::query();
        if ($request->kategori) {
            if ($request->kategori !== "all") {

                $query->where('kategori_kursus', $request->kategori);
            }
        }
        $paket = $query->latest()->get();

        return inertia('Guest/PaketKursus/Index', compact('paket', 'kategori', 'params_kategori'));
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
