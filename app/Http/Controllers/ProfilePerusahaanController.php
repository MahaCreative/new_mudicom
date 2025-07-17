<?php

namespace App\Http\Controllers;

use App\Models\KantorCabang;
use App\Models\Misi;
use App\Models\SosialMedia;
use App\Models\Visi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfilePerusahaanController extends Controller
{
    public function index(Request $request)
    {
        $query = KantorCabang::query();

        $kantor = $query->latest()->get();
        return inertia('Admin/ProfilePerusahaan/Index', compact('kantor'));
    }
    public function create(Request $request)
    {

        return inertia('Admin/ProfilePerusahaan/Create');
    }

    public function store(Request $request)
    {

        $request->validate([
            "nama" => "required|string|min:3|max:255",
            "alamat" => "required|min:10|max:255",
            "kota" => "required|min:3|max:255",
            "provinsi" => "required|min:3|max:255",
            "kode_pos" => "nullable|numeric",
            "telepon" => "required|numeric|digits:12",
            "email" => "required|email",
            "deskripsi" => "required|string|min:50",
            "logo" => "required|image|mimes:jpg,jpeg,png,webp",
            "thumbnail" => "required|image|mimes:jpg,jpeg,png,webp",
            "misi.*" => 'required|string|min:25|max:255',
        ]);
        if (count($request->sosial_media) > 1) {
            if (!empty($request->sosial_media)) {
                $request->validate([
                    "sosial_media.*.kategori" => 'required',
                    "sosial_media.*.name" => 'required',
                    "sosial_media.*.link" => 'required',
                ]);
            }
        }
        if ($request->sosial_media[0]['kategori'] || $request->sosial_media[0]['name']  || $request->sosial_media[0]['link']) {
            $request->validate([
                "sosial_media.*.kategori" => 'required',
                "sosial_media.*.name" => 'required',
                "sosial_media.*.link" => 'required',
            ]);
        }
        DB::beginTransaction();
        try {
            $kode = 'KC-' . str_pad(KantorCabang::count() + 1, 4, '0', STR_PAD_LEFT);
            $thumbnail = $request->file('thumbnail')->store('kantor_cabang/thumbnail');
            $logo = $request->file('logo')->store('kantor_cabang/logo');
            $kantorCabang = KantorCabang::create([
                'nama' => $request->nama,
                'kode' => $kode,
                'alamat' => $request->alamat,
                'kota' => $request->kota,
                'provinsi' => $request->provinsi,
                'kode_pos' => $request->kode_pos,
                'telepon' => $request->telepon,
                'email' => $request->email,
                'deskripsi' => $request->deskripsi,
                'logo' => $logo,
                'thumbnail' => $thumbnail,
                'created_by' => $request->user()->name
            ]);
            $visi = Visi::create([
                'kantor_cabang_id' => $kantorCabang->id,
                'visi' => $request->visi,
            ]);
            foreach ($request->sosial_media as $i => $item) {
                if ($request->sosial_media[$i]['kategori'] && $request->sosial_media[$i]['name']  && $request->sosial_media[$i]['link']) {
                    SosialMedia::create([
                        'kantor_cabang_id' => $kantorCabang->id,
                        'icon' => 4444,
                        'kategori' => $item['kategori'],
                        'name' => $item['name'],
                        'link' => $item['link'],
                    ]);
                }
            }
            foreach ($request->misi as $item) {
                $misi = Misi::create([
                    'kantor_cabang_id' => $kantorCabang->id,
                    'misi' => $item,
                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function edit(Request $request, $kd_cabang)
    {
        $kantor = KantorCabang::with('sosmed', 'visi', 'misi')->where('kode', $kd_cabang)->first();
        return inertia('Admin/ProfilePerusahaan/Update', compact('kantor'));
    }

    public function update(Request $request)
    {

        $request->validate([
            "nama" => "required|string|min:3|max:255",
            "alamat" => "required|min:10|max:255",
            "kota" => "required|min:3|max:255",
            "provinsi" => "required|min:3|max:255",
            "kode_pos" => "nullable|numeric",
            "telepon" => "required|numeric|digits:12",
            "email" => "required|email",
            "deskripsi" => "required|string|min:50",
            "logo" => "nullable|image|mimes:jpg,jpeg,png,webp",
            "thumbnail" => "nullable|image|mimes:jpg,jpeg,png,webp",
            "misi.*.misi" => 'required|string|min:25|max:255',
        ]);
        if (count($request->sosial_media) > 1) {
            if (!empty($request->sosial_media)) {
                $request->validate([
                    "sosial_media.*.kategori" => 'required',
                    "sosial_media.*.name" => 'required',
                    "sosial_media.*.link" => 'required',
                ]);
            }
        }
        if ($request->sosial_media[0]['kategori'] || $request->sosial_media[0]['name']  || $request->sosial_media[0]['link']) {
            $request->validate([
                "sosial_media.*.kategori" => 'required',
                "sosial_media.*.name" => 'required',
                "sosial_media.*.link" => 'required',
            ]);
        }
        DB::beginTransaction();
        try {
            $kantor = KantorCabang::where('kode', $request->kode)->first();
            $logo = $kantor->logo;
            $thumbnail = $kantor->thumbnail;
            if ($request->hasFile('logo')) {

                $logo = $request->file('logo')->store('kantor_cabang/logo');
            }
            if ($request->hasFile('thumbnail')) {
                $thumbnail = $request->file('thumbnail')->store('kantor_cabang/thumbnail');
            }
            $kantor->update([
                'nama' => $request->nama,

                'alamat' => $request->alamat,
                'kota' => $request->kota,
                'provinsi' => $request->provinsi,
                'kode_pos' => $request->kode_pos,
                'telepon' => $request->telepon,
                'email' => $request->email,
                'deskripsi' => $request->deskripsi,
                'logo' => $logo,
                'thumbnail' => $thumbnail,
                'updated_by' => $request->user()->name
            ]);

            $sosmed = SosialMedia::where('kantor_cabang_id', $kantor->id)->delete();

            foreach ($request->sosial_media as $i => $item) {
                if ($request->sosial_media[$i]['kategori'] && $request->sosial_media[$i]['name']  && $request->sosial_media[$i]['link']) {
                    SosialMedia::create([
                        'kantor_cabang_id' => $kantor->id,
                        'icon' => 4444,
                        'kategori' => $item['kategori'],
                        'name' => $item['name'],
                        'link' => $item['link'],
                    ]);
                }
            }
            $ids_misi = [];
            foreach ($request->misi as $index => $item) {
                $ids_misi[$index] = $item['id'];
            }
            $cekMisi = Misi::whereNotIn('id', $ids_misi)->where('kantor_cabang_id', $kantor->id)->get();
            foreach ($cekMisi as $item) {
                $item->delete();
            }

            foreach ($request->misi as $item) {
                if ($item['id']) {
                    $misi = Misi::find($item['id']);
                    $misi->update(['misi' => $item['misi']]);
                } else {
                    $misi = Misi::create(['misi' => $item['misi'], 'kantor_cabang_id' => $kantor->id]);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            Db::rollBack();
            dd($e);
        }
    }

    public function delete(Request $request, $id)
    {
        $profile = KantorCabang::find($id)->delete();
    }
}
