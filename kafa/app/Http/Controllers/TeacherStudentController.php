<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherStudentController extends Controller
{
    public function index()
    {
        $students = Student::all();

        $students->load('results');
        $students->load('parent');

        return Inertia::render('Teacher/Students/Index', ['students' => $students]);
    }
    public function create()
    {
        return Inertia::render('Students/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_name' => 'required|string|max:255',
            'home_address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:students',
        ]);

        Auth::user()->students()->create($request->all());

        return redirect()->route('student.index',)->with('success', 'Student registered successfully.');
    }

    public function edit(Student $student)
    {
        return Inertia::render('Students/Edit', ['student' => $student]);
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'student_name' => 'required|string|max:255',
            'home_address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'email' => 'required|string|email|max:255|unique:students,email,' . $student->id,
        ]);

        $student->update($request->all());

        return redirect()->route('student.index')->with('success', 'Student information updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('student.index')->with('success', 'Student deleted successfully.');
    }
}
