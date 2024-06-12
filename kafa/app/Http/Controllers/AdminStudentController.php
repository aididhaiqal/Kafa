<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminStudentController extends Controller
{
    public function index()
    {
        $students = Student::with('parent')->get();
        return Inertia::render('Admin/Students/Index', ['students' => $students]);
    }

    public function edit(Student $student)
    {
        return Inertia::render('Admin/Students/Edit', ['student' => $student->load('parent')]);
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

        return redirect()->route('admin.students.index')->with('success', 'Student information updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();
        return redirect()->route('admin.students.index')->with('success', 'Student deleted successfully.');
    }
}
