<?php

namespace App\Http\Controllers;

use App\Models\Instruktur;
use App\Models\KantorCabang;
use App\Models\KategoriKursus;
use App\Models\SosialMediaInstruktur;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InstrukturController extends Controller
{
    public function index(Request $request)
    {
        $query = Instruktur::query()->join('kantor_cabangs', 'kantor_cabangs.id', 'instrukturs.kantor_cabang_id')
            ->join('kategori_kursuses', 'kategori_kursuses.id', 'instrukturs.kategori_kursus_id')
            ->select('kantor_cabangs.nama as nama_kantor', 'instrukturs.*', 'kategori_kursuses.nama_kategori as nama_kategori');
        $instruktur = $query->latest()->get();
        return inertia('Admin/Instruktur/Index', compact('instruktur'));
    }
    public function create(Request $request)
    {
        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };



        $kategori = KategoriKursus::latest()->get();
        return inertia('Admin/Instruktur/Create', compact('kantor_cabang', 'kategori'));
    }
    public function store(Request $request)
    {

        $request->validate([
            "kategori_kursus_id" => 'required|exists:kategori_kursuses,id',
            "nik_ktp" => 'required|numeric|digits:16|unique:instrukturs,nik_ktp',
            "nama_lengkap" => 'required|string|min:3|max:255',
            "tempat_lahir" => 'required|string|min:3|max:255',
            "tanggal_lahir" => 'required|date',
            "tanggal_masuk" => 'required|date',
            "tanggal_keluar" => 'nullable|date|after_or_equal:tanggal_masuk',
            "jenis_kelamin" => 'required|in:laki-laki,perempuan',
            "agama" => 'required',
            "alamat" => 'required',
            "kelurahan" => 'nullable|string|min:3',
            "kecamatan" => 'nullable|string|min:3',
            "kabupaten" => 'nullable|string|min:3',
            "telp" => 'required|numeric|digits_between:10,15|unique:instrukturs,telp',
            "pendidikan" => 'required',
            "foto" => 'required|image|mimes:jpeg,png,jpg|max:2048',
            "kantor_cabang_id" => 'required',
            "status" => 'required|in:aktif,keluar',

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
        if ($request->filled('email')) {
            $request->validate([
                "email" => 'required|email|unique:users,email',
                "password" => 'required|string|confirmed|min:8|max:50',
            ]);
        }
        DB::beginTransaction();
        try {
            $userId = null;
            if ($request->filled('email')) {
                $user = User::create([
                    'name' => $request->nama_lengkap,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
                $user->assignRole('Instruktur');
                $userId = $user->id;
            }
            $foto = $request->file('foto')->store('profile/instruktur');
            $kd_instruktur = 'INS-' . str_pad(Instruktur::count() + 1, '0', STR_PAD_LEFT);
            $instruktur = Instruktur::create([
                'user_id' => $userId,
                'kategori_kursus_id' => $request->kategori_kursus_id,
                'kd_instruktur' => $kd_instruktur,
                'nik_ktp' => $request->nik_ktp,
                'nama_lengkap' => $request->nama_lengkap,
                'tempat_lahir' => $request->tempat_lahir,
                'tanggal_lahir' => $request->tanggal_lahir,
                'jenis_kelamin' => $request->jenis_kelamin,
                'telp' => $request->telp,
                'pendidikan' => $request->pendidikan,
                'agama' => $request->agama,
                'alamat' => $request->alamat,
                'kelurahan' => $request->kelurahan,
                'kecamatan' => $request->kecamatan,
                'kabupaten' => $request->kabupaten,
                'deskripsi' => $request->deskripsi,
                'foto' => $foto,
                'tanggal_masuk' => $request->tanggal_masuk,
                'tanggal_keluar' => $request->tanggal_keluar,
                'kantor_cabang_id' => $request->kantor_cabang_id,
                'status' => $request->status,
                'created_by' => $request->user()->name
            ]);
            foreach ($request->sosial_media as $i => $item) {
                if ($request->sosial_media[$i]['kategori'] && $request->sosial_media[$i]['name']  && $request->sosial_media[$i]['link']) {
                    SosialMediaInstruktur::create([
                        'instruktur_id' => $instruktur->id,
                        'icon' => 4444,
                        'kategori' => $item['kategori'],
                        'name' => $item['name'],
                        'link' => $item['link'],
                    ]);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }
    public function edit(Request $request, $kd_ins)
    {
        if ($request->user()->can('only_kantor')) {

            $kantor_cabang = KantorCabang::where('id', $request->user()->petugas->kantor_cabang_id)->latest()->get();
        } else {
            $kantor_cabang = KantorCabang::latest()->get();
        };
        $kategori = KategoriKursus::latest()->get();
        $instruktur = Instruktur::with('user', 'sosmed')->where('kd_instruktur', $kd_ins)->first();
        return inertia('Admin/Instruktur/Update', compact('kantor_cabang', 'kategori', 'instruktur'));
    }

    public function update(Request $request)
    {
        $instruktur = Instruktur::where('kd_instruktur', $request->kd_instruktur)->first();
        $userId = $instruktur->user_id;
        $request->validate([
            "kategori_kursus_id" => 'required|exists:kategori_kursuses,id',
            "nik_ktp" => 'required|numeric|digits:16|unique:instrukturs,nik_ktp,' . $instruktur->id,
            "nama_lengkap" => 'required|string|min:3|max:255',
            "tempat_lahir" => 'required|string|min:3|max:255',
            "tanggal_lahir" => 'required|date',
            "tanggal_masuk" => 'required|date',
            "tanggal_keluar" => 'nullable|date|after_or_equal:tanggal_masuk',
            "jenis_kelamin" => 'required|in:laki-laki,perempuan',
            "agama" => 'required',
            "alamat" => 'required',
            "kelurahan" => 'nullable|string|min:3',
            "kecamatan" => 'nullable|string|min:3',
            "kabupaten" => 'nullable|string|min:3',
            "telp" => 'required|numeric|digits_between:10,15|unique:instrukturs,telp,' . $instruktur->id,
            "pendidikan" => 'required',
            "foto" => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            "kantor_cabang_id" => 'required',
            "status" => 'required|in:aktif,keluar',

        ]);
        $foto = $request->file('foto') ? $request->file('foto')->store('profile/instruktur') : $instruktur->foto;
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
        if ($instruktur->user_id) {

            $user = User::find($instruktur->user_id);
            if ($request->filled('email')) {
                $request->validate([
                    "email" => 'required|email|unique:users,email,' . $instruktur->user_id,
                    "password" => 'nullable|string|confirmed|min:8|max:50',
                ]);
            }

            $user->update([
                'email' => $request->email,
                'password' => $request->password ? bcrypt($request->password) : $user->password
            ]);
        } else {
            if ($request->filled('email')) {
                $request->validate([
                    "email" => 'required|email|unique:users,email',
                    "password" => 'required|string|confirmed|min:8|max:50',
                ]);
            }
            $user = User::create([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            $user->assignRole('Instruktur');
            $userId = $user->id;
        }
        $instruktur->update([
            'user_id' => $userId,
            'kategori_kursus_id' => $request->kategori_kursus_id,
            'nik_ktp' => $request->nik_ktp,
            'nama_lengkap' => $request->nama_lengkap,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'telp' => $request->telp,
            'pendidikan' => $request->pendidikan,
            'agama' => $request->agama,
            'alamat' => $request->alamat,
            'kelurahan' => $request->kelurahan,
            'kecamatan' => $request->kecamatan,
            'kabupaten' => $request->kabupaten,
            'deskripsi' => $request->deskripsi,
            'foto' => $foto,
            'tanggal_masuk' => $request->tanggal_masuk,
            'tanggal_keluar' => $request->tanggal_keluar,
            'kantor_cabang_id' => $request->kantor_cabang_id,
            'updated_by' => $request->user()->name,
            'status' => $request->status,
        ]);

        foreach ($request->sosial_media as $i => $item) {
            if ($item['id']) {
                $sosial_media = SosialMediaInstruktur::find($item['id']);

                if ($request->sosial_media[$i]['kategori'] && $request->sosial_media[$i]['name']  && $request->sosial_media[$i]['link']) {
                    $sosial_media->update([
                        'icon' => 4444,
                        'kategori' => $item['kategori'],
                        'name' => $item['name'],
                        'link' => $item['link'],
                    ]);
                }
            } else {
                if ($request->sosial_media[$i]['kategori'] && $request->sosial_media[$i]['name']  && $request->sosial_media[$i]['link']) {
                    $sosialMedia = SosialMediaInstruktur::create([
                        'instruktur_id' => $instruktur->id,
                        'icon' => 4444,
                        'kategori' => $item['kategori'],
                        'name' => $item['name'],
                        'link' => $item['link'],
                    ]);
                }
            }
        }
    }
}
