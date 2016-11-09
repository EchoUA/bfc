<?php

namespace App\Http\Controllers\Admin;

use App\Role;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class RolesController extends Controller
{
    /**
     * Show all of the roles for the application.
     *
     * @return Response
     */
    public function index(): Response
    {
        return response([
            'data' => Role::get()
        ], 200);
    }
}
