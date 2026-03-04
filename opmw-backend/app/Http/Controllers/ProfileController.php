<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * Get authenticated user's profile
     */
    public function show(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    /**
     * Update profile (name, phone, city)
     */
    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['sometimes', 'nullable', 'string', 'max:20'],
            'city' => ['sometimes', 'nullable', 'string', 'max:100'],
        ]);

        $user = $request->user();
        $user->update($validated);

        return response()->json($user->fresh());
    }

    /**
     * Upload profile photo
     */
    public function uploadPhoto(Request $request): JsonResponse
    {
        $request->validate([
            'photo' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:3072'],
        ]);

        $user = $request->user();

        // Delete old photo
        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        $path = $request->file('photo')->store('photos', 'public');
        $user->update(['profile_photo' => $path]);

        return response()->json(['path' => $path]);
    }

    /**
     * Upload resume
     */
    public function uploadResume(Request $request): JsonResponse
    {
        $request->validate([
            'resume' => ['required', 'file', 'mimes:pdf', 'max:5120'],
        ]);

        $user = $request->user();

        // Delete old resume
        if ($user->resume_path) {
            Storage::disk('public')->delete($user->resume_path);
        }

        $path = $request->file('resume')->store('resumes', 'public');
        $user->update(['resume_path' => $path]);

        return response()->json(['path' => $path]);
    }

    /**
     * Change password
     */
    public function changePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = $request->user();

        if (!Hash::check($validated['current_password'], $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.'],
            ]);
        }

        $user->update(['password' => Hash::make($validated['password'])]);
        $user->tokens()->delete(); // force re-login

        return response()->json(['message' => 'Password changed successfully.']);
    }
}
