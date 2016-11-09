<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table = 'questions';

    protected $fillable = [
        'form_id', 'user_id', 'data', 'position', 'status'
    ];

    public $timestamps = false;


    /**
     * Question users.
     *
     * @return \Illuminate\Http\Response
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }
}
