<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::all();
        return Inertia::render('Activities/Index', ['activities' => $activities]);
    }

    public function show(Activity $activity)
    {
        return Inertia::render('Activities/Show', ['activity' => $activity]);
    }
}
