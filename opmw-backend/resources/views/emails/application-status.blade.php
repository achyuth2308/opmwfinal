<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Application Status Update — OPMW</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #0a0c10;
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
            color: #e2e8f0;
        }

        .container {
            max-width: 580px;
            margin: 40px auto;
            background: #111318;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
        }

        .header {
            padding: 28px 32px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            text-align: center;
        }

        .logo {
            display: inline-block;
            background: rgba(110, 231, 250, 0.1);
            border: 1.5px solid rgba(110, 231, 250, 0.25);
            border-radius: 8px;
            padding: 8px 14px;
            font-size: 14px;
            font-weight: 700;
            font-family: monospace;
            color: #6EE7FA;
        }

        .body {
            padding: 32px;
        }

        h1 {
            font-size: 22px;
            font-weight: 700;
            color: #f8fafc;
            margin: 0 0 12px;
            letter-spacing: -0.02em;
        }

        p {
            font-size: 14px;
            line-height: 1.75;
            color: #94a3b8;
            margin: 0 0 12px;
        }

        .status-box {
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
        }

        .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.06);
            margin: 20px 0;
        }

        .cta {
            display: inline-block;
            margin-top: 8px;
            padding: 11px 24px;
            background: rgba(110, 231, 250, 0.1);
            border: 1px solid rgba(110, 231, 250, 0.3);
            border-radius: 8px;
            color: #6EE7FA;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
        }

        .footer {
            padding: 16px 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            text-align: center;
            font-size: 12px;
            color: #475569;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">OPMW</div>
        </div>
        <div class="body">
            <h1>Status Update</h1>
            <p>Hi {{ $application->applicant_name }}, your application status for <strong
                    style="color:#f8fafc">{{ $application->role }}</strong> at <strong
                    style="color:#f8fafc">{{ $application->location }}</strong> has been updated.</p>

            @php
                $colors = [
                    'Pending' => ['color' => '#FBB040', 'bg' => 'rgba(251,176,64,0.08)', 'border' => 'rgba(251,176,64,0.2)'],
                    'Reviewed' => ['color' => '#60a5fa', 'bg' => 'rgba(96,165,250,0.08)', 'border' => 'rgba(96,165,250,0.2)'],
                    'Shortlisted' => ['color' => '#4ade80', 'bg' => 'rgba(74,222,128,0.08)', 'border' => 'rgba(74,222,128,0.2)'],
                    'Rejected' => ['color' => '#f87171', 'bg' => 'rgba(248,113,113,0.08)', 'border' => 'rgba(248,113,113,0.2)'],
                    'Selected' => ['color' => '#6EE7FA', 'bg' => 'rgba(110,231,250,0.08)', 'border' => 'rgba(110,231,250,0.2)'],
                ];
                $c = $colors[$application->status] ?? $colors['Pending'];
            @endphp

            <div class="status-box" style="background: {{ $c['bg'] }}; border: 1px solid {{ $c['border'] }};">
                <p
                    style="font-size: 11px; font-family: monospace; letter-spacing: 0.12em; text-transform: uppercase; color: {{ $c['color'] }}; margin: 0 0 8px;">
                    New Status</p>
                <p
                    style="font-size: 24px; font-weight: 700; color: {{ $c['color'] }}; margin: 0; letter-spacing: -0.01em;">
                    {{ $application->status }}</p>
            </div>

            @if ($application->admin_notes)
                <p><strong style="color:#f8fafc">Note from OPMW team:</strong> {{ $application->admin_notes }}</p>
            @endif

            <div class="divider"></div>
            <a href="{{ env('FRONTEND_URL') }}/portal/applications" class="cta">View in Portal →</a>
        </div>
        <div class="footer">© {{ date('Y') }} OPMW — One Platform Multiple Work</div>
    </div>
</body>

</html>