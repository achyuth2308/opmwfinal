<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'applicant_name',
        'applicant_email',
        'applicant_phone',
        'role',
        'location',
        'resume_path',
        'cover_note',
        'status',
        'admin_notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
