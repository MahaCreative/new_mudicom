<?php

namespace App\Http\Controllers;

use App\Models\Criteria;
use App\Models\DetailPaketKursus;
use App\Models\FunFact;
use App\Models\JenisKursus;
use App\Models\KantorCabang;
use App\Models\KategoriKursus;
use App\Models\MateriAjar;
use App\Models\PaketKursus;
use App\Models\ReasonPaket;
use App\Models\Solution;
use App\Models\SubKategoriKursus;
use App\Models\Trouble;
use Egulias\EmailValidator\Result\Reason\Reason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ManagementPaketController extends Controller
{
    public function index(Request $request)
    {
        $kategori = KategoriKursus::latest()->get();
        $sub = SubKategoriKursus::with('kategori')->latest()->get();
        $jenis = JenisKursus::latest()->get();
        $query = PaketKursus::query()->with('detail');
        $kantor_cabang = KantorCabang::latest()->get();
        $paket = $query->latest()->get();

        return inertia('Admin/ManagementPaket/Index', compact(
            'paket',
            'kategori',
            'sub',
            'jenis',
            'kantor_cabang'
        ));
    }

    public function create(Request $request)
    {
        $kategori = KategoriKursus::latest()->get();
        $sub = SubKategoriKursus::latest()->get();
        $jenis = JenisKursus::latest()->get();
        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };
        return inertia('Admin/ManagementPaket/Form', compact(
            'kategori',
            'sub',
            'jenis',
            'kantor_cabang'
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
            "kantor_cabang_id" => "required",
            "deskripsi" => "required|string|min:50|max:255",
            "thumbnail" => "required|image|mimes:jpg,jpeg,png,webp,gif",
            "total_pertemuan" => "required|numeric",
            "total_materi" => "required|numeric",
            "harga" => "required|numeric|min_digits:6|max_digits:9",
            "materi.*" => "required|string",
            "pertemuan.*" => "required|numeric|min:1|max:15",
            'reason' => 'required|array|min:1',
            'reason.*.icon' => 'required|image|mimes:jpg,jpeg,svg,webp,icon,png',
            'reason.*.reason' => 'required|string|min:50|max:255',
            'trouble' => 'required|array|min:1',
            'trouble.*.deskripsi_trouble' => 'required|string|min:25|max:255',
            'image_solusi' => 'required|image|mimes:jpg,jpeg,png,webp,svg',
            'deskripsi_solusi' => 'required|string|min:50',
            'image_criteria' => 'required|image|mimes:jpg,jpeg,png,webp,svg',
            'deskripsi_criteria' => 'required|string|min:50',
            'image_funfact' => 'required|image|mimes:jpg,jpeg,png,webp,svg',
            'deskripsi_funfact' => 'required|string|min:50',
        ]);
        DB::beginTransaction();
        try {
            $thumbnail  = $request->file('thumbnail')->store('paket_kursus');
            $kd_paket = 'p0' . PaketKursus::count() + 1;
            $kategoriKursus = KategoriKursus::where('nama_kategori', $request->kategori_kursus)->first();
            $subKategori = SubKategoriKursus::where('nama_sub_kategori', $request->sub_kategori_kursus)->first();

            $paket = PaketKursus::create([
                "kd_paket" => $kd_paket,
                "nama_paket" => $request->nama_paket,
                'slug' => \Str::slug($request->nama_paket),
                "kategori_kursus" => $kategoriKursus->nama_kategori,
                "sub_kategori_kursus" => $subKategori->nama_sub_kategori,
                "jenis_kursus" => $request->jenis_kursus,
                "deskripsi" => $request->deskripsi,
                "thumbnail" => $thumbnail,
                "status" => $request->status,
                "judul_alasan" => $request->judul_alasan,
                "kantor_cabang_id" => $request->kantor_cabang_id,
                "total_pertemuan" => $request->total_pertemuan,
                "total_materi" => $request->total_materi,
                "harga" =>  $request->harga,
                'created_by' => $request->user()->name
            ]);

            foreach ($request->pertemuan as $index => $item) {
                $detail = DetailPaketKursus::create([
                    'paket_kursus_id' => $paket->id,
                    'nama_materi' => $request->materi[$index],
                    'jmlh_pertemuan' => $item,
                ]);
            }
            foreach ($request->reason as $index => $item) {
                $iconPath = null;

                // Cek apakah file diunggah
                if (isset($item['icon']) && $item['icon'] instanceof \Illuminate\Http\UploadedFile) {
                    $iconPath = $item['icon']->store('reason-icons', 'public'); // simpan di storage/app/public/reason-icons
                }
                $reason = ReasonPaket::create([
                    'paket_kursus_id' => $paket->id,
                    'icon' => $iconPath,
                    'reason' => $item['reason'],
                ]);
            }
            foreach ($request->trouble as $item) {
                $trouble = Trouble::create([
                    'paket_kursus_id' => $paket->id,
                    'deskripsi_trouble' => $item['deskripsi_trouble'],
                ]);
            }
            $image_solusi = $request->file('image_solusi')->store('paket');
            $solusi = Solution::create([
                'paket_kursus_id' => $paket->id,
                'image_solusi' => $image_solusi,
                'deskripsi_solusi' => $request->deskripsi_solusi,
            ]);
            $image_criteria = $request->file('image_criteria')->store('paket');
            $criteria = Criteria::create([
                'paket_kursus_id' => $paket->id,
                'image_criteria' => $image_criteria,
                'deskripsi_criteria' => $request->deskripsi_criteria,
            ]);
            $image_funfact = $request->file('image_funfact')->store('paket');
            $funfact = FunFact::create([
                'paket_kursus_id' => $paket->id,
                'image_funfact' => $image_funfact,
                'deskripsi_funfact' => $request->deskripsi_funfact,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
        }
    }
    public function edit(Request $request, $slug)
    {
        $kategori = KategoriKursus::latest()->get();
        $sub = SubKategoriKursus::latest()->get();
        $jenis = JenisKursus::latest()->get();
        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };
        $paket = PaketKursus::with(
            'detail',
            'reason',
            'trouble',
            'solusi',
            'kriteria',
            'funfact',
        )->where('slug', $slug)->first();

        return inertia('Admin/ManagementPaket/FormUpdate', compact(
            'kategori',
            'sub',
            'jenis',
            'kantor_cabang',
            'paket',
        ));
    }
    public function update(Request $request)
    {

        $request->validate([
            "nama_paket" => "required|string|min:10|max:100",
            "kategori_kursus" => "required",
            "sub_kategori_kursus" => "required",
            "jenis_kursus" => "required",
            "status" => "required",
            "kantor_cabang_id" => "required",
            "deskripsi" => "required|string|min:50|max:255",

            "total_pertemuan" => "required|numeric",
            "total_materi" => "required|numeric",
            "harga" => "required|numeric|min_digits:6|max_digits:9",
            "harga_promo" => "required|numeric",
            "materi.*" => "required|string",
            "pertemuan.*" => "required|numeric|min:1|max:15",
            'reason' => 'required|array|min:1',

            'reason.*.reason' => 'required|string|min:50|max:255',
            'trouble' => 'required|array|min:1',
            'trouble.*.deskripsi_trouble' => 'required|string|min:25|max:255',

            'deskripsi_solusi' => 'required|string|min:50',
            'deskripsi_criteria' => 'required|string|min:50',

            'deskripsi_funfact' => 'required|string|min:50',
        ]);
        if ($request->hasFile('thumbnail')) {
            $request->validate(["thumbnail" => "required|image|mimes:jpg,jpeg,png,webp,gif",]);
        }
        if ($request->hasFile('image_solusi')) {
            $request->validate(['image_solusi' => 'required|image|mimes:jpg,jpeg,png,webp,svg',]);
        }
        if ($request->hasFile('image_criteria')) {
            $request->validate(['image_criteria' => 'required|image|mimes:jpg,jpeg,png,webp,svg',]);
        }
        if ($request->hasFile('image_funfact')) {
            $request->validate(['image_funfact' => 'required|image|mimes:jpg,jpeg,png,webp,svg',]);
        }
        $paket = PaketKursus::findOrFail($request->id);



        // DB::beginTransaction();
        // try {
        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail')->store('paket_kursus');
        } else {
            $thumbnail = $paket->thumbnail;
        }

        $kategoriKursus = KategoriKursus::where('nama_kategori', $request->kategori_kursus)->first();
        $subKategori = SubKategoriKursus::where('nama_sub_kategori', $request->sub_kategori_kursus)->first();


        $totalPertemuan = 0;
        $totalMateri = 0;
        // Hapus & insert ulang DetailPaket
        DetailPaketKursus::where('paket_kursus_id', $paket->id)->delete();
        if ($request->has('materi')) {
            foreach ($request->pertemuan as $index => $item) {


                DetailPaketKursus::create([
                    'paket_kursus_id' => $paket->id,
                    'nama_materi' => $request->materi[$index],
                    'jmlh_pertemuan' => $item,
                ]);
                $totalMateri = $totalMateri + 1;
                $totalPertemuan = $totalPertemuan + $item;
            }
        }
        $paket->update([
            "nama_paket" => $request->nama_paket,
            'slug' => \Str::slug($request->nama_paket),
            "kategori_kursus" => $kategoriKursus->nama_kategori,
            "sub_kategori_kursus" => $subKategori->nama_sub_kategori,
            "jenis_kursus" => $request->jenis_kursus,
            "deskripsi" => $request->deskripsi,
            "thumbnail" => $thumbnail,
            "status" => $request->status,
            "judul_alasan" => $request->judul_alasan,
            "kantor_cabang_id" => $request->kantor_cabang_id,
            "total_pertemuan" => $totalPertemuan,
            "total_materi" => $totalMateri,
            "harga" => $request->harga,
            "harga_promo" => $request->harga_promo,
            'updated_by' => $request->user()->name,
        ]);
        $reasonIds = [];
        foreach ($request->reason as $index => $item) {

            if ($item['reason_id']) {
                $request->validate(["reason.$index.icon" => 'nullable|image|mimes:jpg,png,jpeg,svg,webp,icon',]);
                $reasonIds[$index] = $item['reason_id'];
                $reason = ReasonPaket::find($item['reason_id']);
                $icon = $reason->icon;
                if ($request->hasFile("reason.$index.icon")) {
                    $icon = $request->file("reason.$index.icon")->store('paket');
                }
                $reason->update([
                    'icon' => $icon,
                    'reason' => $item['reason']
                ]);
            } else {
                $request->validate(["reason.$index.icon" => 'nullable|image|mimes:jpg,png,jpeg,svg,webp,icon',]);
                $reason = ReasonPaket::create([
                    'paket_kursus_id' => $paket->id,
                    'reason' => $item['reason'],
                    'icon' => $request->file("reason.$index.icon")->store('paket')
                ]);
                $reasonIds[$index] = $reason->id;
            }
        }
        $reasonCheck = ReasonPaket::whereNotIn('id', $reasonIds)->delete();


        // Hapus & insert ulang Trouble
        Trouble::where('paket_kursus_id', $paket->id)->delete();
        if ($request->has('trouble')) {
            foreach ($request->trouble as $item) {
                Trouble::create([
                    'paket_kursus_id' => $paket->id,
                    'deskripsi_trouble' => $item['deskripsi_trouble'],
                ]);
            }
        }

        // Update atau create Solution
        $solusi = Solution::updateOrCreate(
            ['paket_kursus_id' => $paket->id],
            [
                'image_solusi' => $request->hasFile('image_solusi') ? $request->file('image_solusi')->store('paket') : $paket->solusi->image_solusi,
                'deskripsi_solusi' => $request->deskripsi_solusi,
            ]
        );

        // Update or create Criteria
        $criteria = Criteria::updateOrCreate(
            ['paket_kursus_id' => $paket->id],
            [
                'image_criteria' => $request->hasFile('image_criteria') ? $request->file('image_criteria')->store('paket') : $paket->kriteria->image_criteria ?? null,
                'deskripsi_criteria' => $request->deskripsi_criteria,
            ]
        );

        // Update or create FunFact
        $funfact = FunFact::updateOrCreate(
            ['paket_kursus_id' => $paket->id],
            [
                'image_funfact' => $request->hasFile('image_funfact') ? $request->file('image_funfact')->store('paket') : $paket->funfact->image_funfact ?? null,
                'deskripsi_funfact' => $request->deskripsi_funfact,
            ]
        );

        // DB::commit();
        return redirect()->back()->with('success', 'Paket berhasil diupdate');
        // } catch (\Exception $e) {
        //     DB::rollBack();
        //     // return back()->withErrors(['error' => $e->getMessage()]);
        // }
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
