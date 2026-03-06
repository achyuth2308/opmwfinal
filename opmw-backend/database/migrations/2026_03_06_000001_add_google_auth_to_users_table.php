<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Allow password to be nullable (Google OAuth users have no password)
            $table->string('password')->nullable()->change();
            // Store the Google sub (unique user ID)
            $table->string('google_id')->nullable()->unique()->after('email');
            // Store the Google profile picture URL
            $table->string('google_avatar')->nullable()->after('google_id');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['google_id', 'google_avatar']);
            $table->string('password')->nullable(false)->change();
        });
    }
};
