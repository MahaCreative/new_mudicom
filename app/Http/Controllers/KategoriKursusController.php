<?php

namespace App\Http\Controllers;

use App\Models\JenisKursus;
use App\Models\KantorCabang;
use App\Models\KategoriKursus;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;

class KategoriKursusController extends Controller
{
    public function index(Request $request)
    {
        $kategoriQuery = KategoriKursus::join('kantor_cabangs', 'kantor_cabangs.id', 'kategori_kursuses.kantor_cabang_id')
            ->select('kantor_cabangs.nama as nama_kantor', 'kategori_kursuses.*');

        $subQuery = SubKategoriKursus::join('kantor_cabangs', 'kantor_cabangs.id', 'sub_kategori_kursuses.kantor_cabang_id')
            ->join('kategori_kursuses', 'kategori_kursuses.id', 'sub_kategori_kursuses.kategori_kursus_id')
            ->select('kantor_cabangs.nama as nama_kantor', 'sub_kategori_kursuses.*', 'kategori_kursuses.nama_kategori as nama_kategori');

        $jenisQuery = JenisKursus::leftJoin('kantor_cabangs', 'kantor_cabangs.id', 'jenis_kursuses.kantor_cabang_id')
            ->select('kantor_cabangs.nama as nama_kantor', 'jenis_kursuses.*')
            ->with('benefit');
        if ($request->user()->can('only_kantor')) {
            $kategoriQuery->where('kantor_cabangs.id', $request->user()->petugas->kantor_cabang_id);
            $subQuery->where('kantor_cabangs.id', $request->user()->petugas->kantor_cabang_id);
            $jenisQuery->where('kantor_cabangs.id', $request->user()->petugas->kantor_cabang_id);
        }
        $kategori =  $kategoriQuery->latest()->get();
        $sub = $subQuery->latest()->get();
        $jenis = $jenisQuery->latest()->get();

        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };
        return inertia('Admin/ManagementKursus/Index', compact('kategori', 'sub', 'jenis', 'kantor_cabang'));
    }

    public function store(Request $request)
    {
        $attr =  $request->validate([
            'nama_kategori' => 'required|unique:kategori_kursuses,nama_kategori|string|min:3|max:25',
            'deskripsi' => 'required|string|min:3|max:255   ',
            'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp,gif',
            'kantor_cabang_id' => 'required'
        ]);
        $attr['created_by'] = $request->user()->name;
        $attr['thumbnail'] = $request->file('thumbnail')->store('kategori_kursus');
        $kategori = KategoriKursus::create($attr);
    }

    public function update(Request $request)
    {
        $kategori = KategoriKursus::find($request->id);
        $attr =  $request->validate([
            'nama_kategori' => 'required|string|min:3|max:25|unique:kategori_kursuses,nama_kategori,' . $kategori->id,
            'deskripsi' => 'required|string|min:6|max:255',
            'kantor_cabang_id' => 'required',
        ]);
        $attr['thumbnail'] = $kategori->thumbnail;
        if ($request->hasFile('thumbnail')) {
            $request->validate([
                'thumbnail' => 'required|image|mimes:jpeg,jpg,png,webp,gif',
            ]);
            $attr['thumbnail'] = $request->file('thumbnail')->store('kategori_kursus');
        }
        $attr['updated_by'] = $request->user()->name;
        $kategori->update($attr);
    }

    public function delete(Request $request)
    {
        KategoriKursus::find($request->id)->delete();
    }

    public function confirm(Request $request)
    {
        KategoriKursus::find($request->id)->update(['status_konfirmasi' => $request->value, 'updated_by' => $request->user()->name]);
    }
}
