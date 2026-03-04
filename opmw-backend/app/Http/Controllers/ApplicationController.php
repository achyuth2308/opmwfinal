<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Mail\ApplicationConfirmationMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    /**
     * Submit a new application (POST /api/apply) — requires auth
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        // Validate input with strict rules
        $validated = $request->validate([
            'role' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'applicant_name' => ['required', 'string', 'min:2', 'max:255'],
            'applicant_email' => ['required', 'email', 'max:255'],
            'applicant_phone' => ['required', 'string', 'size:10', 'regex:/^[0-9]+$/'],
            'cover_note' => ['nullable', 'string', 'max:2000'],
            'resume' => ['nullable', 'file', 'mimes:pdf', 'max:5120'],
        ]);

        // Prevent submitting as a different user's email
        if (strtolower($validated['applicant_email']) !== strtolower($user->email)) {
            return response()->json([
                'message' => 'Email must match your registered account email.',
                'errors' => ['applicant_email' => ['Email must match your registered account email.']],
            ], 422);
        }

        // Prevent duplicate application for the same role
        $alreadyApplied = Application::where('user_id', $user->id)
            ->where('role', $validated['role'])
            ->exists();

        if ($alreadyApplied) {
            return response()->json([
                'message' => 'You have already applied for this position.',
            ], 409);
        }

        // Handle resume upload
        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('resumes', 'public');
        }

        $application = Application::create([
            'user_id' => $user->id,
            'applicant_name' => $validated['applicant_name'],
            'applicant_email' => $validated['applicant_email'],
            'applicant_phone' => $validated['applicant_phone'],
            'role' => $validated['role'],
            'location' => $validated['location'],
            'resume_path' => $resumePath,
            'cover_note' => $validated['cover_note'] ?? null,
            'status' => 'Pending',
        ]);

        // Send confirmation email (silent on failure)
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
     * Show a single application — only the owner can view it
     */
    public function show(Request $request, Application $application): JsonResponse
    {
        if ($request->user()->id !== $application->user_id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return response()->json($application);
    }
}
