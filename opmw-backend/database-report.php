<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "\n--- OPMW Cloud Database Report ---\n\n";

try {
    $tables = Schema::getTableListing();

    printf("%-30s | %-15s\n", "Table Name", "Record Count");
    echo str_repeat("-", 48) . "\n";

    foreach ($tables as $table) {
        // Skip some system tables if desired, or show all
        $count = DB::table($table)->count();
        printf("%-30s | %-15d\n", $table, $count);
    }

    echo "\n-----------------------------------\n";
    echo "Database: " . config('database.connections.mysql.database') . "\n";
    echo "Host: " . config('database.connections.mysql.host') . "\n";
    echo "-----------------------------------\n\n";

} catch (\Exception $e) {
    echo "Error connecting to cloud database: " . $e->getMessage() . "\n";
}
