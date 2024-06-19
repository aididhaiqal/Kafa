<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'payment_method',
        'amount',
        'status',
    ];

    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
}
