<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>Application Received — OPMW</title>
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

        .detail-row {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;
            font-size: 14px;
        }

        .detail-label {
            color: #64748b;
            min-width: 100px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            padding-top: 2px;
        }

        .detail-value {
            color: #e2e8f0;
            font-weight: 500;
        }

        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 11px;
            font-family: monospace;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #FBB040;
            background: rgba(251, 176, 64, 0.1);
            border: 1px solid rgba(251, 176, 64, 0.25);
        }

        .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.06);
            margin: 20px 0;
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
            <h1>Application Received ✓</h1>
            <p>Hi {{ $application->applicant_name }}, we've received your application and our team will review it
                shortly.</p>
            <div class="divider"></div>
            <div class="detail-row"><span class="detail-label">Role</span><span
                    class="detail-value">{{ $application->role }}</span></div>
            <div class="detail-row"><span class="detail-label">Location</span><span
                    class="detail-value">{{ $application->location }}</span></div>
            <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span
                        class="badge">{{ $application->status }}</span></span></div>
            <div class="divider"></div>
            <p>We typically review applications within 3–5 business days. You will receive an email notification when
                your status changes.</p>
            <p>If you have registered, you can track this application in your portal.</p>
        </div>
        <div class="footer">© {{ date('Y') }} OPMW — One Platform Multiple Work</div>
    </div>
</body>

</html>