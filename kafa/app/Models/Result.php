<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject',
        'grade',
        'feedback',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
