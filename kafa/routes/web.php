<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ParentDashboardController;

use App\Http\Controllers\ResultController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ActivityController;

use App\Http\Controllers\TeacherReportController;
use App\Http\Controllers\TeacherResultController;
use App\Http\Controllers\TeacherDashboardController;

use App\Http\Controllers\AdminParentController;
use App\Http\Controllers\AdminStudentController;
use App\Http\Controllers\AdminActivityController;

use App\Http\Controllers\TeacherStudentController;

use App\Http\Controllers\PaymentController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    } elseif ($user->role === 'teacher') {
        return redirect()->route('teacher.dashboard');
    } else {
        return redirect()->route('parent.dashboard');
    }

})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware(['auth', 'can:parent'])->group(function () {

    Route::get('/parent/dashboard/', [ParentDashboardController::class, 'index'])->name('parent.dashboard');

    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::get('/students/{student}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('/students/{student}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student}', [StudentController::class, 'destroy'])->name('students.destroy');


    Route::get('/results', [ResultController::class, 'index'])->name('results.index');
    Route::get('/results/{student}', [ResultController::class, 'show'])->name('results.show');
    Route::get('/results/report/{student}', [ResultController::class, 'report'])->name('results.report');

});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
    Route::get('/activities/{activity}', [ActivityController::class, 'show'])->name('activities.show');


    Route::resource('payments', PaymentController::class);
});

Route::middleware(['auth', 'can:teacher'])->group(function () {

    Route::get('/teacher/dashboard/', [TeacherDashboardController::class, 'index'])->name('teacher.dashboard');

    Route::get('/teacher/students/', [TeacherStudentController::class, 'index'])->name('teacher.students.index');

    Route::get('/teacher/result/{student}', [TeacherResultController::class, 'index'])->name('teacher.results.index');

    Route::get('/teacher/result/new/{student}', [TeacherResultController::class, 'create'])->name('teacher.results.create');
    Route::post('/teacher/result/new/', [TeacherResultController::class, 'store'])->name('teacher.results.store');

    Route::get('/teacher/result/edit/{result}', [TeacherResultController::class, 'edit'])->name('teacher.results.edit');
    Route::put('/teacher/result/edit/{result}', [TeacherResultController::class, 'update'])->name('teacher.results.update');

    Route::delete('/teacher/result/{result}', [TeacherResultController::class, 'destroy'])->name('teacher.results.destroy');

    Route::get('/teacher/report', [TeacherReportController::class, 'show'])->name('teacher.report');

});


Route::middleware(['auth', 'can:admin'])->group(function () {

    Route::get('/admin/dashboard/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/students', [AdminStudentController::class, 'index'])->name('admin.students.index');
    Route::get('/admin/students/{student}/edit', [AdminStudentController::class, 'edit'])->name('admin.students.edit');
    Route::put('/admin/students/{student}', [AdminStudentController::class, 'update'])->name('admin.students.update');
    Route::delete('/admin/students/{student}', [AdminStudentController::class, 'destroy'])->name('admin.students.destroy');

    Route::get('/admin/parents', [AdminParentController::class, 'index'])->name('admin.parents.index');
    Route::get('/admin/parents/{parent}/edit', [AdminParentController::class, 'edit'])->name('admin.parents.edit');
    Route::put('/admin/parents/{parent}', [AdminParentController::class, 'update'])->name('admin.parents.update');
    Route::delete('/admin/parents/{parent}', [AdminParentController::class, 'destroy'])->name('admin.parents.destroy');

    Route::get('/admin/activities', [AdminActivityController::class, 'index'])->name('admin.activities.index');
    Route::get('/admin/activities/create', [AdminActivityController::class, 'create'])->name('admin.activities.create');
    Route::post('/admin/activities', [AdminActivityController::class, 'store'])->name('admin.activities.store');
    Route::get('/admin/activities/{activity}/edit', [AdminActivityController::class, 'edit'])->name('admin.activities.edit');
    Route::put('/admin/activities/{activity}', [AdminActivityController::class, 'update'])->name('admin.activities.update');
    Route::delete('/admin/activities/{activity}', [AdminActivityController::class, 'destroy'])->name('admin.activities.destroy');
    });

require __DIR__.'/auth.php';
