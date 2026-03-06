<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Applications: speed up admin filters and user lookups
        Schema::table('applications', function (Blueprint $table) {
            if (!$this->indexExists('applications', 'applications_status_index')) {
                $table->index('status', 'applications_status_index');
            }
            if (!$this->indexExists('applications', 'applications_user_id_index')) {
                $table->index('user_id', 'applications_user_id_index');
            }
            if (!$this->indexExists('applications', 'applications_created_at_index')) {
                $table->index('created_at', 'applications_created_at_index');
            }
        });

        // Job offers: speed up active job listing
        Schema::table('job_offers', function (Blueprint $table) {
            if (!$this->indexExists('job_offers', 'job_offers_is_active_index')) {
                $table->index('is_active', 'job_offers_is_active_index');
            }
        });

        // Contacts: speed up unread count query
        Schema::table('contacts', function (Blueprint $table) {
            if (!$this->indexExists('contacts', 'contacts_is_read_index')) {
                $table->index('is_read', 'contacts_is_read_index');
            }
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropIndexIfExists('applications_status_index');
            $table->dropIndexIfExists('applications_user_id_index');
            $table->dropIndexIfExists('applications_created_at_index');
        });
        Schema::table('job_offers', function (Blueprint $table) {
            $table->dropIndexIfExists('job_offers_is_active_index');
        });
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropIndexIfExists('contacts_is_read_index');
        });
    }

    private function indexExists(string $table, string $index): bool
    {
        return collect(\DB::select("SHOW INDEX FROM `{$table}`"))
            ->pluck('Key_name')
            ->contains($index);
    }
};
