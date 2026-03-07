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
        $counts = \DB::table('users')
            ->selectRaw('(SELECT COUNT(*) FROM users) as total_users')
            ->selectRaw('(SELECT COUNT(*) FROM applications) as total_applications')
            ->selectRaw("(SELECT COUNT(*) FROM applications WHERE status = 'Pending') as pending_applications")
            ->selectRaw("(SELECT COUNT(*) FROM contacts WHERE is_read = 0) as unread_contacts")
            ->selectRaw("(SELECT COUNT(*) FROM demo_requests WHERE is_read = 0) as unread_demo_requests")
            ->first();

        return response()->json([
            'total_users' => (int) $counts->total_users,
            'total_applications' => (int) $counts->total_applications,
            'pending_applications' => (int) $counts->pending_applications,
            'unread_contacts' => (int) $counts->unread_contacts,
            'unread_demo_requests' => (int) $counts->unread_demo_requests,
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
