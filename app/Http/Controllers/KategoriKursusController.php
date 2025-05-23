<?php

namespace App\Http\Controllers;

use App\Models\JenisKursus;
use App\Models\KategoriKursus;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;

class KategoriKursusController extends Controller
{
    public function index(Request $request)
    {
        $kategori = KategoriKursus::latest()->get();
        $sub = SubKategoriKursus::with('kategori')->latest()->get();
        $jenis = JenisKursus::with('benefit')->latest()->get();
        return inertia('Admin/ManagementKursus/Index', compact('kategori', 'sub', 'jenis'));
    }

    public function store(Request $request)
    {
        $attr =  $request->validate([
            'nama_kategori' => 'required|unique:kategori_kursuses,nama_kategori|string|min:3|max:25',
            'deskripsi' => 'required|string|min:3|max:255   ',
            'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp,gif',
        ]);
        $attr['thumbnail'] = $request->file('thumbnail')->store('kategori_kursus');
        $kategori = KategoriKursus::create($attr);
    }

    public function update(Request $request)
    {
        $kategori = KategoriKursus::find($request->id);
        $attr =  $request->validate([
            'nama_kategori' => 'required|string|min:3|max:25|unique:kategori_kursuses,nama_kategori,' . $kategori->id,
            'deskripsi' => 'required|string|min:6|max:255',
        ]);
        $attr['thumbnail'] = $kategori->thumbnail;
        if ($request->hasFile('thumbnail')) {
            $request->validate([
                'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp,gif',
            ]);
            $attr['thumbnail'] = $request->file('thumbnail')->store('kategori_kursus');
        }
        $kategori->update($attr);
    }

    public function delete(Request $request)
    {
        KategoriKursus::find($request->id)->delete();
    }
}
