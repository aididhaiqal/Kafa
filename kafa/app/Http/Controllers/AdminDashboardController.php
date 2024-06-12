<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Student;
use App\Models\Activity;
use App\Models\User;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $studentsCount = Student::count();
        $activitiesCount = Activity::count();
        $usersCount = User::count();

        $recentStudents = Student::orderBy('created_at', 'desc')->take(5)->get();
        $recentActivities = Activity::orderBy('created_at', 'desc')->take(5)->get();
        $recentUsers = User::orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'studentsCount' => $studentsCount,
            'activitiesCount' => $activitiesCount,
            'usersCount' => $usersCount,
            'recentStudents' => $recentStudents,
            'recentActivities' => $recentActivities,
            'recentUsers' => $recentUsers,
        ]);
    }
}
