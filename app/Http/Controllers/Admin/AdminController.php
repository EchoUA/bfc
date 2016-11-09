<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{

    /*
     * Show main application page
     */
    public function index()
    {
        return view('layouts.admin');
    }
}
