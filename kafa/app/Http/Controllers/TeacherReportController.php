<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherReportController extends Controller
{
    public function show(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $results = Result::with('student')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get()
            ->groupBy('student_id');

        return Inertia::render('Teacher/Reports/TeacherReport', [
            'results' => $results,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]);
    }
}
