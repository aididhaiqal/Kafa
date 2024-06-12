<?php

namespace App\Policies;

use App\Models\User;

class ParentPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function parent(User $user)
    {
        return $user->role === 'parent';
    }
}
