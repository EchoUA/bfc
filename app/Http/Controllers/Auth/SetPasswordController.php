<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;

class SetPasswordController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Where to redirect users after set new password.
     *
     * @var string
     */
    protected $redirectTo = '/admin';

    public function show($token)
    {
        return view('auth.passwords.set')->with(
            ['password_token' => $token]
        );
    }

    public function store(Request $request)
    {
        try{
            $rules = [
                'password_token' =>  'exists:users,password_token',
                'password' => 'required|confirmed',
                'password_confirmation' => 'required'
            ];

            $validator = Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                $messages = $validator->messages();
                return view('auth.passwords.set')->with(
                    ['errors' => $messages, 'password_token' => $request->password_token]
                );
            } else {
                $user = User::where('password_token', $request->password_token)->firstOrFail();
                $user->password = $request->password;
                $user->password_token = NULL;
                $user->save();
                Auth::guard()->login($user);
                return redirect($this->redirectTo);
            }
        }catch (ModelNotFoundException $e){
            return 'Invalid token';
        }
    }
}
