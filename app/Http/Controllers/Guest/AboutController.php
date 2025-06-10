<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Misi;
use App\Models\SosialMedia;
use App\Models\Visi;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function index(Request $request)
    {
        $visi = Visi::where('kantor_cabang_id', 2)->first();
        $misi = Misi::where('kantor_cabang_id', 2)->get();
        $sosmed = SosialMedia::where('kantor_cabang_id', 2)->get();
        return inertia('Guest/About/About', compact('visi', 'misi', 'sosmed'));
    }
}
