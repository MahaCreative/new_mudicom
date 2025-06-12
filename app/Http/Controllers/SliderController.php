<?php

namespace App\Http\Controllers;

use App\Models\KantorCabang;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index(Request $request)
    {
        $query = Slider::query()->join('kantor_cabangs', 'kantor_cabangs.id', 'sliders.kantor_cabang_id')
            ->select('kantor_cabangs.nama as nama_cabang', 'sliders.*');
        $slider = $query->latest()->get();
        return inertia('Admin/Slider/Index', compact('slider'));
    }

    public function create(Request $request)
    {
        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };
        return inertia('Admin/Slider/Create', compact('kantor_cabang'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|min:40|max:100',
            'tag_line' => 'required|string|min:40|max:255',
            'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp',
            'status' => 'required',
            'kantor_cabang_id' => 'required',
        ]);
        $thumbnail = $request->file('thumbnail')->store('slider');
        $slider = Slider::create([
            'judul' => $request->judul,
            'tag_line' => $request->tag_line,
            'thumbnail' => $thumbnail,
            'status' => $request->status,
            'kantor_cabang_id' => $request->kantor_cabang_id,
            'created_by' => $request->user()->name
        ]);
    }
}
