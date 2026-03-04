<?php

namespace Database\Seeders;

use App\Models\JobOffer;
use Illuminate\Database\Seeder;

class JobOfferSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'International Voice Executive',
                'department' => 'BPO',
                'type' => 'Full-time',
                'cities' => ['Chennai', 'Hyderabad', 'Bangalore', 'Noida', 'Indore'],
                'experience' => '0–3 years',
                'description' => 'Handle inbound and outbound international voice processes with expert communication and KPI discipline. Prior BPO experience preferred.',
            ],
            [
                'title' => 'Non-Voice Data Executive',
                'department' => 'BPO',
                'type' => 'Full-time',
                'cities' => ['Chennai', 'Hyderabad', 'Bangalore', 'Noida', 'Indore'],
                'experience' => '0–2 years',
                'description' => 'Process and manage data entry, catalog updates, and backend operations with high accuracy and speed.',
            ],
            [
                'title' => 'Amazon Process Associate',
                'department' => 'BPO',
                'type' => 'Full-time',
                'cities' => ['Chennai', 'Hyderabad'],
                'experience' => '0–3 years',
                'description' => 'Support Amazon seller operations including catalog management, case handling, and marketplace compliance activities.',
            ],
            [
                'title' => 'Web Developer (Full Stack)',
                'department' => 'IT',
                'type' => 'Full-time',
                'cities' => ['Hyderabad', 'Bangalore'],
                'experience' => '2–5 years',
                'description' => 'Build enterprise web applications using Laravel, React, or .NET Core. Experience with MySQL or SQL Server required.',
            ],
            [
                'title' => 'HR Executive',
                'department' => 'HR',
                'type' => 'Full-time',
                'cities' => ['Chennai'],
                'experience' => '1–3 years',
                'description' => 'Manage recruitment, onboarding, employee engagement, and compliance documentation across OPMW branches.',
            ],
            [
                'title' => 'Payroll Specialist',
                'department' => 'HR',
                'type' => 'Full-time',
                'cities' => ['Chennai', 'Noida'],
                'experience' => '2–4 years',
                'description' => 'Process multi-city payroll, manage attendance records, and ensure statutory compliance across all branches.',
            ],
            [
                'title' => 'Team Lead',
                'department' => 'Operations',
                'type' => 'Full-time',
                'cities' => ['Chennai', 'Hyderabad', 'Bangalore', 'Noida', 'Indore'],
                'experience' => '3–6 years',
                'description' => 'Lead a team of voice or non-voice executives, manage daily KPIs, run floor operations, and report to operations management.',
            ],
            [
                'title' => 'Quality Analyst',
                'department' => 'Operations',
                'type' => 'Full-time',
                'cities' => ['Chennai', 'Hyderabad'],
                'experience' => '1–4 years',
                'description' => 'Monitor call and process quality, provide feedback and coaching, and maintain quality documentation and reporting.',
            ],
        ];

        foreach ($jobs as $job) {
            JobOffer::updateOrCreate(
                ['title' => $job['title'], 'department' => $job['department']],
                $job
            );
        }
    }
}
