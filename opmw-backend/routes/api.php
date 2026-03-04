<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminApplicationController;
use App\Http\Controllers\Admin\AdminCandidateController;
use App\Http\Controllers\Admin\AdminJobController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

/*
|──────────────────────────────────────────────────────────
|  PUBLIC ROUTES
|──────────────────────────────────────────────────────────
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Contact form (public)
// Job listings (public)
Route::get('/jobs', [JobController::class, 'index']);

/*
|──────────────────────────────────────────────────────────
|  CANDIDATE ROUTES (requires Sanctum auth)
|──────────────────────────────────────────────────────────
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Job application (requires login)
    Route::post('/apply', [ApplicationController::class, 'store']);

    // Applications
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/{application}', [ApplicationController::class, 'show']);

    // Profile
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/photo', [ProfileController::class, 'uploadPhoto']);
    Route::post('/profile/resume', [ProfileController::class, 'uploadResume']);
    Route::patch('/profile/password', [ProfileController::class, 'changePassword']);

    // Notifications (Laravel's built-in)
    Route::get('/notifications', function (\Illuminate\Http\Request $request) {
        return response()->json(
            $request->user()->notifications()->latest()->take(20)->get()
        );
    });
});

/*
|──────────────────────────────────────────────────────────
|  ADMIN ROUTES
|──────────────────────────────────────────────────────────
*/
Route::prefix('admin')->group(function () {
    // Admin login (no auth required)
    Route::post('/login', [AdminAuthController::class, 'login']);

    // Protected admin routes
    Route::middleware(['auth:sanctum', \App\Http\Middleware\Admin::class])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);

        // Dashboard
        Route::get('/dashboard', [AdminDashboardController::class, 'index']);

        // Applications management
        Route::get('/applications', [AdminApplicationController::class, 'index']);
        Route::get('/applications/{application}', [AdminApplicationController::class, 'show']);
        Route::patch('/applications/{application}/status', [AdminApplicationController::class, 'updateStatus']);

        // Candidate management
        Route::get('/candidates', [AdminCandidateController::class, 'index']);
        Route::get('/candidates/{user}', [AdminCandidateController::class, 'show']);

        // Job management
        Route::get('/jobs', [AdminJobController::class, 'index']);
        Route::post('/jobs', [AdminJobController::class, 'store']);
        Route::patch('/jobs/{job}', [AdminJobController::class, 'update']);
        Route::delete('/jobs/{job}', [AdminJobController::class, 'destroy']);

        // Contacts
        Route::get('/contacts', [ContactController::class, 'index']);
    });
});
