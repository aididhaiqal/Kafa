<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherResultController extends Controller
{
    public function index(Student $student, Request $request)
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

        return Inertia::render('Teacher/Results/Index', [
            'student' => $student,
            'results' => $results,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
    }

    public function create(Student $student)
    {
        return Inertia::render('Teacher/Results/Create', ['student' => $student]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject' => 'required|string|max:255',
            'grade' => 'required|string|max:2',
            'feedback' => 'nullable|string',
        ]);

        $existingResult = Result::where('student_id', $request->student_id)
            ->where('subject', $request->subject)
            ->first();

        if ($existingResult) {
            return back()->withErrors(['subject' => 'The student already has a result for this subject.']);
        }

        $result = Result::create($request->all());

        return Inertia::location(route('teacher.results.index', ['student' => $request->student_id]));

    }

    public function edit(Result $result)
    {
        $students = Student::all();
        return Inertia::render('Teacher/Results/Edit', ['result' => $result, 'students' => $students]);
    }

    public function update(Request $request, Result $result)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject' => 'required|string|max:255',
            'grade' => 'required|string|max:2',
            'feedback' => 'nullable|string',
        ]);

        $result->update($request->all());

        return redirect()->route('teacher.results.index')->with('success', 'Result updated successfully.');
    }

    public function show(Result $result)
    {
        $result->load('student');
        return Inertia::render('Teacher/Results/Show', ['result' => $result]);
    }


    public function destroy(Result $result)
    {
        $result->delete();
        return redirect()->route('teacher.results.index')->with('success', 'Result deleted successfully.');
    }
}
