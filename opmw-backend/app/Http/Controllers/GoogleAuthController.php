<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    /**
     * Verify Google credential (JWT from Google Identity Services / One-Tap)
     * and return a Sanctum token.
     *
     * POST /api/auth/google
     * Body: { "credential": "<google_id_token>" }
     */
    public function handleCallback(Request $request): JsonResponse
    {
        $request->validate([
            'credential' => ['required', 'string'],
        ]);

        // ── Verify the Google ID token against Google's token-info endpoint ──
        $idToken = $request->input('credential');
        $googleUser = $this->verifyGoogleToken($idToken);

        if (!$googleUser) {
            return response()->json([
                'message' => 'Invalid Google token. Please try again.',
            ], 422);
        }

        // ── Find or create the user ──────────────────────────────────────────
        $user = User::where('google_id', $googleUser['sub'])
            ->orWhere('email', $googleUser['email'])
            ->first();

        if ($user) {
            // Update google_id if the user already exists but logged in via email before
            $user->update([
                'google_id'     => $googleUser['sub'],
                'google_avatar' => $googleUser['picture'] ?? $user->google_avatar,
                // Update profile photo only if they don't have one already
                'profile_photo' => $user->profile_photo ?: ($googleUser['picture'] ?? null),
            ]);
        } else {
            // Create a brand-new user from Google data
            $user = User::create([
                'name'          => $googleUser['name']    ?? $googleUser['email'],
                'email'         => $googleUser['email'],
                'google_id'     => $googleUser['sub'],
                'google_avatar' => $googleUser['picture'] ?? null,
                'profile_photo' => $googleUser['picture'] ?? null,
                'password'      => null,                          // No password for Google users
                'email_verified_at' => now(),                     // Google accounts are already verified
            ]);
        }

        // ── Issue a Sanctum token ────────────────────────────────────────────
        $user->tokens()->delete();                               // Single-session policy
        $token = $user->createToken('opmw-google-token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    /**
     * Verify a Google ID token by calling Google's tokeninfo endpoint.
     * Returns the decoded payload array on success, or null on failure.
     *
     * We intentionally use Google's tokeninfo API rather than local JWT
     * verification so we don't need any extra PHP libraries.
     */
    private function verifyGoogleToken(string $idToken): ?array
    {
        $clientId = config('services.google.client_id');

        if (!$clientId) {
            \Log::error('GOOGLE_CLIENT_ID is not set in backend .env');
            return null;
        }

        try {
            $response = Http::timeout(10)
                ->withoutVerifying() // Fix "cURL error 60: SSL certificate problem" on Windows
                ->get('https://oauth2.googleapis.com/tokeninfo', [
                    'id_token' => $idToken,
                ]);

            if (!$response->successful()) {
                \Log::warning('Google tokeninfo returned non-200', ['status' => $response->status()]);
                return null;
            }

            $payload = $response->json();

            // Validate the audience (aud) matches our Client ID
            if (($payload['aud'] ?? null) !== $clientId) {
                \Log::warning('Google token audience mismatch', [
                    'expected' => $clientId,
                    'got'      => $payload['aud'] ?? 'none',
                ]);
                return null;
            }

            // Ensure the token is not expired
            if (isset($payload['exp']) && (int) $payload['exp'] < time()) {
                \Log::warning('Google token expired');
                return null;
            }

            // Require a verified email
            if (($payload['email_verified'] ?? 'false') !== 'true') {
                \Log::warning('Google token email not verified');
                return null;
            }

            return $payload;
        } catch (\Throwable $e) {
            \Log::error('Google token verification failed', ['error' => $e->getMessage()]);
            return null;
        }
    }
}
