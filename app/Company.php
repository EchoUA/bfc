<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'logo', 'code', 'creation_date', 'creation_user'
    ];

    /**
     * Companies with user.
     *
     * @return \Illuminate\Http\Response
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    /**
     * Companies with forms.
     *
     * @return \Illuminate\Http\Response
     */
    public function forms()
    {
        return $this->hasMany('App\Form');
    }
}
