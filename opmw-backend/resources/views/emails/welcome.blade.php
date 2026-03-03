<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to OPMW</title>
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
            background: #111318;
            padding: 32px;
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
            font-family: 'JetBrains Mono', monospace;
            color: #6EE7FA;
            letter-spacing: 0.05em;
        }

        .body {
            padding: 36px 32px;
        }

        h1 {
            font-size: 24px;
            font-weight: 700;
            color: #f8fafc;
            margin: 0 0 12px;
            letter-spacing: -0.02em;
        }

        p {
            font-size: 15px;
            line-height: 1.75;
            color: #94a3b8;
            margin: 0 0 16px;
        }

        .cta {
            display: inline-block;
            margin-top: 8px;
            padding: 12px 28px;
            background: rgba(110, 231, 250, 0.1);
            border: 1px solid rgba(110, 231, 250, 0.3);
            border-radius: 8px;
            color: #6EE7FA;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
        }

        .footer {
            padding: 20px 32px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            text-align: center;
        }

        .footer p {
            font-size: 12px;
            color: #475569;
            margin: 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">OPMW</div>
        </div>
        <div class="body">
            <h1>Welcome, {{ $user->name }}!</h1>
            <p>Your OPMW Candidate Portal account has been successfully created. You can now browse open roles, submit
                applications, and track your application status — all in one place.</p>
            <p>Find your next opportunity with OPMW across BPO, IT, and HRMS roles spanning Chennai, Hyderabad,
                Bangalore, Noida, and Indore.</p>
            <a href="{{ env('FRONTEND_URL') }}/portal" class="cta">Access Your Portal →</a>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} OPMW — One Platform Multiple Work. All rights reserved.</p>
            <p style="margin-top:4px;">Tidel Park, Taramani, Chennai – 600113</p>
        </div>
    </div>
</body>

</html>