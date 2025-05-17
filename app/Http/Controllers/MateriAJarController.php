<?php

namespace App\Http\Controllers;

use App\Models\MateriAjar;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;

class MateriAJarController extends Controller
{
    //

    public function index(Request $request)
    {
        $query = MateriAjar::query()->with('kategori');
        $materi = $query->latest()->get();
        $sub = SubKategoriKursus::latest()->get();
        return inertia('Admin/MateriAjar/Index', compact('materi', 'sub'));
    }

    public function store(Request $request)
    {

        $request->validate([
            "sub_kategrori_id" => 'required',
            "nama_materi" => 'required|string|min:6|max:100|unique:materi_ajars,nama_materi',
            "thumbnail" => 'required|image|mimes:jpg,jpeg,png,gif,webp',
            "deskripsi" => 'required|string|min:25|max:255',
            "modul" => 'nullable|mimes:pdf',
            "silabus" => 'nullable|mimes:pdf',
        ]);
        $modul = $request->file('modul') ? $request->file('modul')->store('modul/' . $request->nama_materi) : null;
        $silabus = $request->file('silabus') ? $request->file('silabus')->store('silabus/' . $request->nama_materi) : null;
        $thumbnail = $request->file('thumbnail')->store('materi_ajar' . $request->nama_materi);
        $materi = MateriAjar::create([
            'sub_kategrori_id' => $request->sub_kategrori_id,
            'nama_materi' => $request->nama_materi,
            "thumbnail" => $thumbnail,
            "deskripsi" => $request->deskripsi,
            "modul" => $modul,
            "silabus" => $silabus,
        ]);
    }

    public function update(Request $request)
    {
        $materi = MateriAjar::find($request->id);
        $request->validate([
            "sub_kategrori_id" => 'required',
            "nama_materi" => 'required|string|min:6|max:100|unique:materi_ajars,nama_materi,' . $materi->id,
            "thumbnail" => 'nullable|image|mimes:jpg,jpeg,png,gif,webp',
            "deskripsi" => 'required|string|min:25|max:255',
            "modul" => 'nullable|mimes:pdf',
            "silabus" => 'nullable|mimes:pdf',
        ]);
        $thumbnail = $materi->thumbnail;
        $modul = $materi->modul;
        $silabus = $materi->silabus;
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail')->store('materi_ajar' . $request->nama_materi);
        }
        if ($request->hasFile('modul')) {
            $modul = $request->file('modul') ? $request->file('modul')->store('modul/' . $request->nama_materi) : null;
        }
        if ($request->hasFile('silabus')) {
            $silabus = $request->file('silabus') ? $request->file('silabus')->store('silabus/' . $request->nama_materi) : null;
        }
        $materi->update([
            'sub_kategrori_id' => $request->sub_kategrori_id,
            'nama_materi' => $request->nama_materi,
            "thumbnail" => $thumbnail,
            "deskripsi" => $request->deskripsi,
            "modul" => $modul,
            "silabus" => $silabus,
        ]);
    }

    public function delete(Request $request)
    {
        MateriAjar::find($request->id)->delete();
    }
}
