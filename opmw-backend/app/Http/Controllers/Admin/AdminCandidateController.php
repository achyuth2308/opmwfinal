<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminCandidateController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = User::withCount('applications')->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        return response()->json($query->paginate(20));
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user->load('applications'));
    }
}
