<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\JobOffer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class AdminJobController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(JobOffer::latest()->get());
    }
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'cities' => 'required|array',
            'experience' => 'required|string|max:100',
            'description' => 'required|string',
            'is_active' => 'boolean'
        ]);
        $job = JobOffer::create($validated);
        return response()->json($job, 201);
    }
    public function update(Request $request, JobOffer $job): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'department' => 'string|max:255',
            'type' => 'string|max:100',
            'cities' => 'array',
            'experience' => 'string|max:100',
            'description' => 'string',
            'is_active' => 'boolean'
        ]);
        $job->update($validated);
        return response()->json($job);
    }
    public function destroy(JobOffer $job): JsonResponse
    {
        $job->delete();
        return response()->json(null, 204);
    }
}
