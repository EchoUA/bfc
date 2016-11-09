<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Zizaco\Entrust\Traits\EntrustUserTrait;


class User extends Authenticatable
{
    use Notifiable, EntrustUserTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'password_token', 'creation_date', 'creation_user'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'password_token', 'remember_token',
    ];

    /**
     * User roles.
     *
     * @return \Illuminate\Http\Response
     */
    public function role_user()
    {
        return $this->belongsToMany('App\Role');
    }

    /**
     * User company.
     *
     * @return \Illuminate\Http\Response
     */
    public function company()
    {
        return $this->belongsToMany('App\Company');
    }

    /**
     * User questions.
     *
     * @return \Illuminate\Http\Response
     */
    public function questions()
    {
        return $this->belongsToMany('App\Question');
    }

    /**
     * Password hash.
     *
     * @return \Illuminate\Http\Response
     */
    public function setPasswordAttribute($pass){

        $this->attributes['password'] = Hash::make($pass);

    }

    /**
     * Creation user.
     *
     * @return \Illuminate\Http\Response
     */
    public function creation_user()
    {
        return $this->hasOne('App\User', 'id', 'creation_user');
    }
}
