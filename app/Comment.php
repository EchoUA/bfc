<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question_id', 'user_id', 'comment', 'reply', 'reply_to', 'date'
    ];

    /**
     * Comment wit user relation.
     *
     */
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
}
