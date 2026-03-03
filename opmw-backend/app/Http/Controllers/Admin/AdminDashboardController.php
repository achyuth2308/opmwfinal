<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminDashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'total_users' => User::count(),
            'total_applications' => Application::count(),
            'pending_applications' => Application::where('status', 'Pending')->count(),
            'unread_contacts' => Contact::where('is_read', false)->count(),
            'recent_applications' => Application::with('user')
                ->latest()
                ->take(10)
                ->get(),
            'status_breakdown' => Application::selectRaw('status, count(*) as count')
                ->groupBy('status')
                ->pluck('count', 'status'),
        ]);
    }
}
