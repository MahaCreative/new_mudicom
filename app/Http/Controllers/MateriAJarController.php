<?php

namespace App\Http\Controllers;

use App\Models\KantorCabang;
use App\Models\MateriAjar;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;

class MateriAJarController extends Controller
{
    //

    public function index(Request $request)
    {
        $query = MateriAjar::query()->with('kategori')->join('kantor_cabangs', 'kantor_cabangs.id', 'materi_ajars.kantor_cabang_id')
            ->select('kantor_cabangs.nama as nama_kantor', 'materi_ajars.*');

        $materi = $query->latest()->get();
        $sub = SubKategoriKursus::latest()->get();
        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };
        return inertia('Admin/MateriAjar/Index', compact('materi', 'sub', 'kantor_cabang'));
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
            'kantor_cabang_id' => 'required',
        ]);
        $modul = $request->file('modul') ? $request->file('modul')->store('modul/' . $request->nama_materi) : null;
        $silabus = $request->file('silabus') ? $request->file('silabus')->store('silabus/' . $request->nama_materi) : null;
        $thumbnail = $request->file('thumbnail')->store('materi_ajar' . $request->nama_materi);
        $materi = MateriAjar::create([
            'sub_kategrori_id' => $request->sub_kategrori_id,
            'nama_materi' => $request->nama_materi,
            'kantor_cabang_id' => $request->kantor_cabang_id,
            "thumbnail" => $thumbnail,
            "deskripsi" => $request->deskripsi,
            "modul" => $modul,
            "silabus" => $silabus,
            "created_by" => $request->user()->name,
        ]);
    }

    public function update(Request $request)
    {
        $materi = MateriAjar::find($request->id);
        $request->validate([
            "sub_kategrori_id" => 'required',
            "kantor_cabang_id" => 'required',
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
            'kantor_cabang_id' => $request->kantor_cabang_id,
            "thumbnail" => $thumbnail,
            "deskripsi" => $request->deskripsi,
            "modul" => $modul,
            "silabus" => $silabus,
            "updated_by" => $request->user()->name,
        ]);
    }

    public function delete(Request $request)
    {
        MateriAjar::find($request->id)->delete();
    }
}
