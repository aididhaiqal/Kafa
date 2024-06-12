<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Activity;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index(Request $request)
    {
        $recentResults = Result::with('student')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($result) {
                return [
                    'id' => $result->id,
                    'student_name' => $result->student->student_name,
                    'subject' => $result->subject,
                    'grade' => $result->grade,
                    'feedback' => $result->feedback,
                ];
            });

        $upcomingActivities = Activity::where('activityDate', '>=', now())
            ->orderBy('activityDate', 'asc')
            ->take(5)
            ->get()
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'name' => $activity->activityName,
                    'date' => $activity->activityDate,
                    'time' => $activity->activityTime,
                    'location' => $activity->location,
                ];
            });

        return Inertia::render('Teacher/Dashboard', [
            'recentResults' => $recentResults,
            'upcomingActivities' => $upcomingActivities,
        ]);
    }
}
