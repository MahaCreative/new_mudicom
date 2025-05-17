<?php

namespace App\Http\Controllers;

use App\Models\DetailPaketKursus;
use App\Models\JenisKursus;
use App\Models\KategoriKursus;
use App\Models\PaketKursus;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;

class ManagementPaketController extends Controller
{
    public function index(Request $request)
    {
        $kategori = KategoriKursus::latest()->get();
        $sub = SubKategoriKursus::with('kategori')->latest()->get();
        $jenis = JenisKursus::latest()->get();
        $query = PaketKursus::query()->with('detail');
        $paket = $query->latest()->get();

        return inertia('Admin/ManagementPaket/Index', compact(
            'paket',
            'kategori',
            'sub',
            'jenis',
        ));
    }

    public function store(Request $request)
    {

        $request->validate([
            "nama_paket" => "required|string|min:10|max:100",
            "kategori_kursus" => "required",
            "sub_kategori_kursus" => "required",
            "jenis_kursus" => "required",
            "status" => "required",
            "deskripsi" => "required|string|min:50|max:255",
            "thumbnail" => "required|image|mimes:jpg,jpeg,png,webp,gif",
            "total_pertemuan" => "required|numeric",
            "total_materi" => "required|numeric",
            "harga" => "required|numeric|min_digits:6|max_digits:7",
            "materi.*" => "required|string",
            "pertemuan.*" => "required|numeric|min:5|max:15",
        ]);
        $thumbnail  = $request->file('thumbnail')->store('paket_kursus');
        $kd_paket = 'p0' . PaketKursus::count() + 1;
        $kategoriKursus = KategoriKursus::where('nama_kategori', $request->kategori_kursus)->first();
        $subKategori = SubKategoriKursus::where('nama_sub_kategori', $request->sub_kategori_kursus)->first();

        $paket = PaketKursus::create([
            "kd_paket" => $kd_paket,
            "nama_paket" => $request->nama_paket,
            "kategori_kursus" => $kategoriKursus->nama_kategori,
            "sub_kategori_kursus" => $subKategori->nama_sub_kategori,
            "jenis_kursus" => $request->jenis_kursus,
            "deskripsi" => $request->deskripsi,
            "thumbnail" => $thumbnail,
            "status" => $request->status,
            "total_pertemuan" => $request->total_pertemuan,
            "total_materi" => $request->total_materi,
            "harga" =>  $request->harga,
            "status" => 'aktif',
        ]);

        foreach ($request->pertemuan as $index => $item) {
            $detail = DetailPaketKursus::create([
                'paket_kursus_id' => $paket->id,
                'nama_materi' => $request->materi[$index],
                'jmlh_pertemuan' => $item,
            ]);
        }
    }

    public function update(Request $request)
    {
        // dd($request->all());
        $paket = PaketKursus::find($request->id);
        $request->validate([
            "nama_paket" => "required|string|min:10|max:100",
            "kategori_kursus" => "required",
            "sub_kategori_kursus" => "required",
            "jenis_kursus" => "required",
            "status" => "required",
            "deskripsi" => "required|string|min:50|max:255",
            "thumbnail" => "nullable|image|mimes:jpg,jpeg,png,webp,gif",
            "total_pertemuan" => "required|numeric",
            "total_materi" => "required|numeric",
            "harga" => "required|numeric|min_digits:6|max_digits:7",
            "materi.*" => "nullable|string",
            "pertemuan.*" => "nullable|numeric|min:5|max:15",
        ]);
        $thumbnail = $paket->thumbnail;
        $kategoriKursus = KategoriKursus::where('nama_kategori', $request->kategori_kursus)->first();
        $subKategori = SubKategoriKursus::where('nama_sub_kategori', $request->sub_kategori_kursus)->first();
        $paket->update([
            "nama_paket" => $request->nama_paket,
            "kategori_kursus" => $kategoriKursus->nama_kategori,
            "sub_kategori_kursus" => $subKategori->nama_sub_kategori,
            "jenis_kursus" => $request->jenis_kursus,
            "deskripsi" => $request->deskripsi,
            "thumbnail" => $thumbnail,
            "total_pertemuan" => $request->total_pertemuan,
            "total_materi" => $request->total_materi,
            "harga" =>  $request->harga,
            "status" => 'aktif',
        ]);
        if (count($request->materi) > 0) {

            foreach ($request->pertemuan as $index => $item) {
                $cekMateri = DetailPaketKursus::where('paket_kursus_id', $paket->id)->where('nama_materi', $request->materi[$index])->first();
                if (!$cekMateri == null) {
                    $detail = DetailPaketKursus::create([
                        'paket_kursus_id' => $paket->id,
                        'nama_materi' => $request->materi[$index],
                        'jmlh_pertemuan' => $item,
                    ]);
                } else {
                }
            }
        }
    }

    public function delete(Request $request)
    {
        PaketKursus::find($request->id)->delete();
    }

    public function delete_detail(Request $request)
    {

        $detail = DetailPaketKursus::find($request->id);
        $paket = PaketKursus::find($detail->paket_kursus_id);
        $paket->update([
            'total_pertemuan' => $paket->total_pertemuan - $request->jmlh_pertemuan,
            'total_materi' => $paket->total_materi - 1
        ]);
        $detail->delete();
    }
}
