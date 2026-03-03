<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Mail\AdminContactNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Store a contact form submission (POST /api/contact)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        $contact = Contact::create($validated);

        // Notify admin
        try {
            Mail::to(config('mail.admin_address', 'admin@opmw.in'))
                ->send(new AdminContactNotification($contact));
        } catch (\Throwable $e) {
            // Log but don't fail
        }

        return response()->json([
            'message' => 'Thank you for reaching out. We will get back to you shortly.',
        ], 201);
    }

    /**
     * List all contacts (admin only)
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::latest()->get();
        return response()->json($contacts);
    }
}
