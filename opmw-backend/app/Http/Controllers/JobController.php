<?php
namespace App\Http\Controllers;
use App\Models\JobOffer;
use Illuminate\Http\JsonResponse;
class JobController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(JobOffer::where('is_active', true)->latest()->get());
    }
}
