<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Mail\ApplicationConfirmationMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    /**
     * Submit a new application (POST /api/apply)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'role' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'applicant_name' => ['required', 'string', 'max:255'],
            'applicant_email' => ['required', 'email'],
            'applicant_phone' => ['nullable', 'string', 'max:20'],
            'cover_note' => ['nullable', 'string', 'max:2000'],
            'resume' => ['nullable', 'file', 'mimes:pdf', 'max:5120'],
        ]);

        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('resumes', 'local');
        }

        $user = $request->user(); // null for guest applications

        $application = Application::create([
            'user_id' => $user?->id,
            'applicant_name' => $validated['applicant_name'],
            'applicant_email' => $validated['applicant_email'],
            'applicant_phone' => $validated['applicant_phone'] ?? null,
            'role' => $validated['role'],
            'location' => $validated['location'],
            'resume_path' => $resumePath,
            'cover_note' => $validated['cover_note'] ?? null,
            'status' => 'Pending',
        ]);

        // Confirmation mail to applicant
        try {
            Mail::to($application->applicant_email)
                ->send(new ApplicationConfirmationMail($application));
        } catch (\Throwable $e) {
            // Log but don't block
        }

        return response()->json($application, 201);
    }

    /**
     * List authenticated user's applications (GET /api/applications)
     */
    public function index(Request $request): JsonResponse
    {
        $applications = $request->user()
            ->applications()
            ->latest()
            ->get();

        return response()->json($applications);
    }

    /**
     * Show a single application
     */
    public function show(Request $request, Application $application): JsonResponse
    {
        // Only allow if owner
        if ($request->user()->id !== $application->user_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return response()->json($application);
    }
}
