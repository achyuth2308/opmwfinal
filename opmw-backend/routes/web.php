<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'online',
        'message' => 'OPMW Backend API is running.',
        'api_base_url' => str_replace('http://', 'https://', url('/api')),
        'timestamp' => now()->toIso8601String()
    ]);
});
