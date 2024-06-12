<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::all();
        return Inertia::render('Admin/Activities/Index', ['activities' => $activities]);
    }

    public function create()
    {
        return Inertia::render('Admin/Activities/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'activityName' => 'required|string|max:255',
            'activityDescription' => 'required|string',
            'activityDate' => 'required|date',
            'activityTime' => 'required',
            'activityLocation' => 'required|string|max:255',
            'activityTentative' => 'required|string',
            'status' => 'required|string',
        ]);

        Activity::create($request->all());

        return redirect()->route('admin.activities.index')->with('success', 'Activity created successfully.');
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activities/Edit', ['activity' => $activity]);
    }

    public function update(Request $request, Activity $activity)
    {
        $request->validate([
            'activityName' => 'required|string|max:255',
            'activityDescription' => 'required|string',
            'activityDate' => 'required|date',
            'activityTime' => 'required',
            'activityLocation' => 'required|string|max:255',
            'activityTentative' => 'required|string',
            'status' => 'required|string',
        ]);

        $activity->update($request->all());

        return redirect()->route('admin.activities.index')->with('success', 'Activity updated successfully.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();
        return redirect()->route('admin.activities.index')->with('success', 'Activity deleted successfully.');
    }
}
