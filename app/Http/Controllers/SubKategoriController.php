<?php

namespace App\Http\Controllers;

use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;

class SubKategoriController extends Controller
{
    public function store(Request $request)
    {

        $attr =  $request->validate([
            'kategori_kursus_id' => 'required',
            'nama_sub_kategori' => 'required|unique:sub_kategori_kursuses,nama_sub_kategori|string|min:6|max:25',
            'deskripsi' => 'required|string|min:6|max:255',
            'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp,gif',
        ]);
        $attr['thumbnail'] = $request->file('thumbnail')->store('sub_kategori_kursus');
        $sub = SubKategoriKursus::create($attr);
    }
    public function update(Request $request)
    {
        $sub = SubKategoriKursus::find($request->id);
        $attr =  $request->validate([
            'kategori_kursus_id' => 'required',
            'nama_sub_kategori' => 'required|string|min:6|max:25|unique:sub_kategori_kursuses,nama_sub_kategori,' . $sub->id,
            'deskripsi' => 'required|string|min:6|max:255',
        ]);
        $attr['thumbnail'] = $sub->thumbnail;
        if ($request->hasFile('thumbnail')) {
            $request->validate([
                'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp,gif',
            ]);
            $attr['thumbnail'] = $request->file('thumbnail')->store('sub_kategori_kursus');
        }

        $sub = SubKategoriKursus::create($attr);
    }

    public function delete(Request $request)
    {
        SubKategoriKursus::find($request->id)->delete();
    }
}
