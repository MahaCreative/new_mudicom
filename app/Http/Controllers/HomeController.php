<?php

namespace App\Http\Controllers;

use App\Models\PaketKursus;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {

        $paket = PaketKursus::latest()->get()->take(3);
        return inertia('Home/Landingpage', compact('paket'));
    }
}
