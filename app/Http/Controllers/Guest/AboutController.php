<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\KantorCabang;
use App\Models\Misi;
use App\Models\SosialMedia;
use App\Models\Visi;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(Request $request)
    {
        $kantor = KantorCabang::where('status', 'pusat')->first();
        $visi = Visi::where('kantor_cabang_id', $kantor->id)->first();
        $misi = Misi::where('kantor_cabang_id', $kantor->id)->get();
        $sosmed = SosialMedia::where('kantor_cabang_id', $kantor->id)->get();
        return inertia('Guest/About/About', compact('visi', 'misi', 'sosmed'));
    }
}
