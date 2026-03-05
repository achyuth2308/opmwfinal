<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

function printTable($title, $headers, $rows)
{
    echo "\n=== $title ===\n";
    $widths = array_map('strlen', $headers);
    foreach ($rows as $row) {
        foreach (array_values($row) as $i => $val) {
            $widths[$i] = max($widths[$i], strlen((string) $val));
        }
    }

    foreach ($headers as $i => $h) {
        printf("%-" . ($widths[$i] + 2) . "s", $h);
    }
    echo "\n" . str_repeat("-", array_sum($widths) + (count($widths) * 2)) . "\n";

    foreach ($rows as $row) {
        foreach (array_values($row) as $i => $val) {
            printf("%-" . ($widths[$i] + 2) . "s", substr((string) $val, 0, 50));
        }
        echo "\n";
    }
}

echo "\n--- OPMW Cloud Database Dashboard ---\n";

try {
    // 1. Table Summary
    $tables = Schema::getTableListing();
    $summary = [];
    foreach ($tables as $table) {
        $summary[] = ['Table' => $table, 'Records' => DB::table($table)->count()];
    }
    printTable("Database Summary", ["Table Name", "Records"], $summary);

    // 2. Sample Data: Services
    $services = DB::table('services')->select('id', 'title', 'category')->get()->toArray();
    printTable("Services (First 4)", ["ID", "Title", "Category"], array_map(function ($s) {
        return (array) $s;
    }, $services));

    // 3. Sample Data: Job Roles
    $jobs = DB::table('job_roles')->select('id', 'title', 'city', 'type')->limit(5)->get()->toArray();
    printTable("Job Roles (Sample 5)", ["ID", "Title", "City", "Type"], array_map(function ($j) {
        return (array) $j; }, $jobs));

} catch (\Exception $e) {
    echo "\nError: " . $e->getMessage() . "\n";
}
echo "\n--- End of Dashboard ---\n\n";
