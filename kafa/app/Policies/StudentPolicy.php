<?php

namespace App\Policies;

use App\Models\Student;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StudentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any students.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasRole('admin') || $user->hasRole('teacher'); // Adjust according to your role implementation
    }

    /**
     * Determine whether the user can view the student.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Student  $student
     * @return mixed
     */
    public function view(User $user, Student $student)
    {
        return $user->hasRole('parent') && $student->parent_id == $user->id; // Adjust according to your role implementation
    }

    // Other policy methods (create, update, delete, etc.) can be defined here as needed
}
