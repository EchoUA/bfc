<?php

namespace App;

use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{
    /**
     * Get role by slug (name).
     *
     */
    public function getBySlug($slug)
    {
        return $this->where('name', $slug)->first();
    }
}