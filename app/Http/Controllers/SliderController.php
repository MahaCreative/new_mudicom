<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index(Request $request)
    {
        $query = Slider::query();
        $slider = $query->latest()->get();
        return inertia('Admin/Slider/Index', compact('slider'));
    }

    public function create(Request $request)
    {
        return inertia('Admin/Slider/Create',);
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|min:40|max:100',
            'tag_line' => 'required|string|min:40|max:255',
            'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp',
            'status' => 'required',
        ]);
        $thumbnail = $request->file('thumbnail')->store('slider');
        $slider = Slider::create([
            'judul' => $request->judul,
            'tag_line' => $request->tag_line,
            'thumbnail' => $thumbnail,
            'status' => $request->status,
        ]);
    }
}
