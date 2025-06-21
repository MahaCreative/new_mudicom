<?php

namespace App\Providers;

use App\Models\KantorCabang;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('*', function ($view) {
            $mudicom = KantorCabang::where('status', 'pusat')->first();
            $view->with('mudicom', $mudicom);
        });
    }
}
