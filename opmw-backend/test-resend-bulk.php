<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Resend\Laravel\Facades\Resend;
use App\Models\User;

$users = User::all();

echo "Starting bulk email test for all database users...\n";
echo "Note: Without a verified domain, most of these will likely fail unless they are your Resend account email.\n\n";

foreach ($users as $user) {
    try {
        echo "Testing recipient: " . $user->email . " ... ";
        $result = Resend::emails()->send([
            'from' => config('mail.from.address'),
            'to' => $user->email,
            'subject' => 'Database User Verification Test',
            'html' => '<strong>Resend Test for user: ' . $user->name . '</strong>',
        ]);
        echo "SUCCESS! (ID: " . $result->id . ")\n";
    } catch (\Exception $e) {
        echo "FAILED. Reason: " . $e->getMessage() . "\n";
    }
}

echo "\nTest complete. Check the results above.\n";
