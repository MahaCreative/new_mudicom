<?php

namespace App\Http\Controllers;

use App\Models\KantorCabang;
use App\Models\Siswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Siswa::query()
            ->join('kantor_cabangs', 'kantor_cabangs.id', 'siswas.kantor_cabang_id')
            ->select('kantor_cabangs.nama as nama_kantor', 'siswas.*')
            ->with('user');
        $siswa = $query->latest()->get();
        return inertia('Admin/Siswa/Index', compact('siswa'));
    }

    public function create(Request $request)
    {
        $kantor_cabang = KantorCabang::latest()->get();
        return inertia('Admin/Siswa/Create', compact('kantor_cabang'));
    }

    public function store(Request $request)
    {
        $request->validate([
            "nik_ktp" => 'nullable|numeric|digits:16|unique:siswas,nik_ktp',
            "nama_lengkap" => 'required|string|min:3|max:255',
            "tempat_lahir" => 'nullable|string|min:3|max:255',
            "tanggal_lahir" => 'required|date',
            "jenis_kelamin" => 'required|in:laki-laki,perempuan',
            "agama" => 'required',
            "alamat" => 'required',
            "kelurahan" => 'nullable|string|min:3',
            "kecamatan" => 'nullable|string|min:3',
            "kabupaten" => 'nullable|string|min:3',
            "telp" => 'required|numeric|digits_between:10,15|unique:siswas,telp',
            "pendidikan" => 'nullable',
            'pekerjaan' => 'nullable|string|min:3|max:50',
            'nama_ayah' => 'nullable|string|min:3|max:50',
            'nama_ibu' => 'nullable|string|min:3|max:50',
            "foto" => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            "kantor_cabang_id" => 'required',
            "status" => 'required|in:aktif,keluar',
        ]);
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
                $user->assignRole($request->jabatan);
                $userId = $user->id;
            }
            $foto = $request->file('foto') ? $request->file('foto')->store('profile/siswa') : 'image/default_profile.png';
            $kd_siswa = 'SI-' . str_pad(Siswa::count() + 1, 5, '0', STR_PAD_LEFT);;
            $siswa = Siswa::create([
                'user_id' => $userId,
                'kd_siswa' => $kd_siswa,
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
                'kantor_cabang_id' => $request->kantor_cabang_id,
                'foto' => $foto,
                'status' => $request->status,
                'pekerjaan' => $request->pekerjaan,
                'nama_ayah' => $request->nama_ayah,
                'nama_ibu' => $request->nama_ibu,
                'created_by'  => $request->user()->name
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function edit(Request $request, $kd_siswa)
    {
        $kantor_cabang = KantorCabang::latest()->get();

        $siswa = Siswa::with('user')->where('kd_siswa', $kd_siswa)->first();
        return inertia('Admin/Siswa/Update', compact('kantor_cabang', 'siswa'));
    }

    public function update(Request $request)
    {
        $siswa = Siswa::where('kd_siswa', $request->kd_siswa)->first();
        $userId = $siswa->user_id;

        $request->validate([

            "nik_ktp" => 'nullable|numeric|digits:16|unique:siswas,nik_ktp,' . $siswa->id,
            "nama_lengkap" => 'required|string|min:3|max:255',
            "tempat_lahir" => 'nullable|string|min:3|max:255',
            "tanggal_lahir" => 'required|date',
            "jenis_kelamin" => 'required|in:laki-laki,perempuan',
            "agama" => 'required',
            "alamat" => 'nullable',
            "kelurahan" => 'nullable|string|min:3',
            "kecamatan" => 'nullable|string|min:3',
            "kabupaten" => 'nullable|string|min:3',
            "telp" => 'required|numeric|digits_between:10,15|unique:siswas,telp,' . $siswa->id,
            "pendidikan" => 'nullable',
            "foto" => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            "kantor_cabang_id" => 'required',
            "status" => 'required|in:aktif,keluar',
            'pekerjaan' => 'nullable|string|min:3|max:50',
            'nama_ayah' => 'nullable|string|min:3|max:50',
            'nama_ibu' => 'nullable|string|min:3|max:50',
        ]);

        $foto =  $siswa->foto;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto')->store('profile/siswa');
        }

        if ($siswa->user_id) {

            $user = User::find($siswa->user_id);
            if ($request->filled('email')) {
                $request->validate([
                    "email" => 'required|email|unique:users,email,' . $siswa->user_id,
                    "password" => 'nullable|string|confirmed|min:8|max:50',
                ]);
            }

            $user->update([
                'email' => $request->email,
                'password' => $request->password ? bcrypt($request->password) : $user->password
            ]);
        } else {
            if ($request->email) {
                $request->validate([
                    "email" => 'required|email|unique:users,email',
                    "password" => 'required|string|confirmed|min:8|max:50',
                ]);
                $user = User::create([
                    'name' => $request->nama_lengkap,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
                $user->assignRole($request->jabatan);
                $userId = $user->id;
            }
        }
        $siswa->update([
            'user_id' => $userId,
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
            'foto' => $foto,
            'kantor_cabang_id' => $request->kantor_cabang_id,
            'status' => $request->status,
            'pekerjaan' => $request->pekerjaan,
            'nama_ayah' => $request->nama_ayah,
            'nama_ibu' => $request->nama_ibu,
            'updated_by' => $request->user()->name,
        ]);
    }
}
