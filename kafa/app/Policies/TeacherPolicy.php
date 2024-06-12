<?php

namespace App\Policies;

use App\Models\User;

class TeacherPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function teacher(User $user)
    {
        return $user->role === 'teacher';
    }
}
