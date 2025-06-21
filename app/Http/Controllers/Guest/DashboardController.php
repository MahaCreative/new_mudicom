<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Guest/Dashboard/Index');
    }
    public function store(Request $request)
    {
        dd($request->all());
    }
}
