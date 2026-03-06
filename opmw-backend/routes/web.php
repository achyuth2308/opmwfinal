<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'online',
        'message' => 'OPMW Backend API is running.',
        'api_base_url' => url('/api'),
        'timestamp' => now()->toIso8601String()
    ]);
});
