<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    protected $table = 'forms';

    protected $fillable = [
        'company_id', 'user_id', 'name', 'position'
    ];

    public $timestamps = false;

    /**
     * Form questions.
     *
     * @return \Illuminate\Http\Response
     */
    public function questions()
    {
        return $this->hasMany('App\Question', 'form_id');
    }

}
