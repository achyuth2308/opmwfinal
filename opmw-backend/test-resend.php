<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Resend\Laravel\Facades\Resend;

try {
    echo "Testing Resend API...\n";
    $result = Resend::emails()->send([
        'from' => config('mail.from.address'),
        'to' => 'sdash6239@gmail.com', // Your verified Resend email
        'subject' => 'OPMW Resend Test Success',
        'html' => '<strong>Resend is working correctly!</strong>',
    ]);

    echo "Success! Email sent. ID: " . $result->id . "\n";
} catch (\Exception $e) {
    echo "Failed to send email.\n";
    echo "Error: " . $e->getMessage() . "\n";
    echo "\nMake sure your RESEND_API_KEY is correct in .env and you have restarted the server.\n";
}
