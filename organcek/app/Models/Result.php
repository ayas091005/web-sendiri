<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    use HasFactory;

    protected $fillable = [
        'berat_badan', 'tinggi_badan', 'bmi', 'bmi_category', 'organ_scores'
    ];

    protected $casts = [
        'organ_scores' => 'array',
    ];
}
