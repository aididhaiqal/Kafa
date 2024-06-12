<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function index()
    {
        $results = Result::with('student')->get();
        return Inertia::render('Results/Index', ['results' => $results]);
    }

    public function show(Student $student, Request $request)
    {
        $query = $student->results();

        if ($request->has(['start_date', 'end_date'])) {
            $validated = $request->validate([
                'start_date' => 'required|date',
                'end_date' => 'required|date',
            ]);

            $query->whereBetween('created_at', [$validated['start_date'], $validated['end_date']]);
        }

        $results = $query->get();

        return Inertia::render('Results/Show', [
            'student' => $student,
            'results' => $results,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
    }
}
