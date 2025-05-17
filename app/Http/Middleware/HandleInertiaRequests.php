<?php

namespace App\Http\Middleware;

use App\Models\Instruktur;
use App\Models\KantorCabang;
use App\Models\MateriAjar;
use App\Models\Siswa;
use App\Models\Slider;
use App\Models\SubKategoriKursus;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $count = [
            'count_siswa' =>  Siswa::count(),
            'count_instruktur' =>  Instruktur::count(),
            'count_materi' =>  MateriAjar::count(),
        ];
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'roles' => fn() => $request->user()?->getRoleNames(),
                'permissions' => fn() => $request->user()?->getAllPermissions()->pluck('name'),
            ],
            'profile' => KantorCabang::with('sosmed')->where('status', 'pusat')->first(),
            'slider' => Slider::where('status', 'aktif')->latest()->get(),
            'count' => $count,
            'sub_kategori' => SubKategoriKursus::latest()->get()->take(4),
            'materi' => MateriAjar::with('kategori')->latest()->get(),
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
