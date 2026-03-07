<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;
use App\Models\User;

try {
    echo "Attempting to send test mail to sdash6239@gmail.com...\n";
    $user = User::first();
    if (!$user) {
        echo "No user found in database to test with.\n";
        exit;
    }
    
    Mail::to('sdash6239@gmail.com')->send(new WelcomeMail($user));
    echo "Success! Mail sent (hopefully).\n";
} catch (\Exception $e) {
    echo "Failed to send mail.\n";
    echo "Error: " . $e->getMessage() . "\n";
}
