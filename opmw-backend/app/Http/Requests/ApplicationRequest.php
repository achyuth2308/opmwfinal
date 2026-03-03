<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplicationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'role' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'applicant_name' => ['required', 'string', 'max:255'],
            'applicant_email' => ['required', 'email'],
            'applicant_phone' => ['nullable', 'string', 'max:20'],
            'cover_note' => ['nullable', 'string', 'max:2000'],
            'resume' => ['nullable', 'file', 'mimes:pdf', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'resume.mimes' => 'Resume must be a PDF file.',
            'resume.max' => 'Resume must be smaller than 5 MB.',
        ];
    }
}
