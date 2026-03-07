<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\DemoRequest;
use Illuminate\Http\JsonResponse;

class DemoRequestController extends Controller
{
    /**
     * Store a demo request (POST /api/demo/request)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'company_name' => ['required', 'string', 'max:255'],
            'contact_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'string', 'max:20'],
            'employee_count' => ['required', 'string', 'max:50'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]);

        $demoRequest = DemoRequest::create($validated);

        return response()->json([
            'message' => 'Demo request submitted successfully. Our team will contact you soon.',
            'data' => $demoRequest
        ], 201);
    }

    /**
     * List all demo requests (admin only)
     */
    public function index(): JsonResponse
    {
        $requests = DemoRequest::latest()->get();
        return response()->json($requests);
    }

    /**
     * Mark a demo request as read (PATCH /api/admin/demo-requests/{demoRequest}/read)
     */
    public function markAsRead(DemoRequest $demoRequest): JsonResponse
    {
        $demoRequest->update(['is_read' => true]);
        return response()->json(['message' => 'Demo request marked as read.']);
    }
}
