<?php

namespace App\Providers;

use App\Policies\AdminPolicy;
use App\Policies\ParentPolicy;
use App\Policies\TeacherPolicy;
use App\Policies\StudentPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    protected $policies = [
        Student::class => StudentPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('admin', [AdminPolicy::class, 'admin']);
        Gate::define('teacher', [TeacherPolicy::class, 'teacher']);
        Gate::define('parent', [ParentPolicy::class, 'parent']);
        Gate::define('student', [StudentPolicy::class, 'student']);
    }
}
