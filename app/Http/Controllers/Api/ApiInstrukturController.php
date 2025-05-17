<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Instruktur;
use App\Models\KategoriKursus;
use Illuminate\Http\Request;

class ApiInstrukturController extends Controller
{
    public function index(Request $request)
    {
        $query = Instruktur::query();
        if ($request->kategori) {
            $kategori = KategoriKursus::where('nama_kategori', str($request->kategori))->first();

            $query->where('kategori_kursus_id', $kategori->id);
        }
        if ($request->search) {

            $query->where(function ($query) use ($request) {
                $query->where('nama_lengkap', 'like', '%' . $request->search . '%')
                    ->orWhere('kd_instruktur', 'like', '%' . $request->search . '%');
            });
        }
        $instruktur = $query->get();

        return response()->json($instruktur);
    }

    public function show(Request $request) {}
}
