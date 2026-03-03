<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ApplicationStatusMail;
use App\Models\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminApplicationController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Application::with('user')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('applicant_name', 'like', "%{$search}%")
                    ->orWhere('applicant_email', 'like', "%{$search}%")
                    ->orWhere('role', 'like', "%{$search}%");
            });
        }

        return response()->json($query->paginate(20));
    }

    public function show(Application $application): JsonResponse
    {
        return response()->json($application->load('user'));
    }

    public function updateStatus(Request $request, Application $application): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:Pending,Reviewed,Shortlisted,Rejected,Selected'],
            'admin_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $application->update($validated);

        // Notify candidate by email
        try {
            Mail::to($application->applicant_email)
                ->send(new ApplicationStatusMail($application));
        } catch (\Throwable $e) {
            // Log but don't fail
        }

        return response()->json($application->fresh());
    }
}
