<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Result;
use App\Models\Activity;
use App\Models\Student;

class ParentDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $students = Student::where('parent_id', $user->id)->with('results')->get();
        $upcomingActivities = Activity::where('activityDate', '>=', now())
            ->orderBy('activityDate', 'asc')
            ->take(5)
            ->get();

        return Inertia::render('Parent/Dashboard', [
            'students' => $students,
            'upcomingActivities' => $upcomingActivities,
        ]);
    }
}
