<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <title>New Contact Inquiry — OPMW</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #0a0c10;
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
        }

        .container {
            max-width: 560px;
            margin: 40px auto;
            background: #111318;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            overflow: hidden;
        }

        .header {
            padding: 24px 28px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .logo {
            display: inline-block;
            background: rgba(110, 231, 250, 0.1);
            border: 1.5px solid rgba(110, 231, 250, 0.25);
            border-radius: 7px;
            padding: 6px 12px;
            font-size: 13px;
            font-weight: 700;
            font-family: monospace;
            color: #6EE7FA;
        }

        .body {
            padding: 28px;
        }

        h1 {
            font-size: 20px;
            font-weight: 700;
            color: #f8fafc;
            margin: 0 0 16px;
        }

        .field {
            margin-bottom: 14px;
        }

        .label {
            font-size: 11px;
            font-family: monospace;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #64748b;
            margin-bottom: 4px;
        }

        .value {
            font-size: 14px;
            color: #e2e8f0;
            line-height: 1.6;
        }

        .message-box {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 8px;
            padding: 14px;
            margin-top: 4px;
            font-size: 14px;
            color: #94a3b8;
            line-height: 1.7;
        }

        .footer {
            padding: 14px 28px;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            font-size: 12px;
            color: #475569;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <div class="logo">OPMW Admin</div>
        </div>
        <div class="body">
            <h1>New Contact Inquiry</h1>
            <div class="field">
                <div class="label">Name</div>
                <div class="value"><?php echo e($contact->name); ?></div>
            </div>
            <div class="field">
                <div class="label">Email</div>
                <div class="value"><?php echo e($contact->email); ?></div>
            </div>
            <div class="field">
                <div class="label">Subject</div>
                <div class="value"><?php echo e($contact->subject); ?></div>
            </div>
            <div class="field">
                <div class="label">Message</div>
                <div class="message-box"><?php echo e($contact->message); ?></div>
            </div>
        </div>
        <div class="footer">Received <?php echo e(now()->format('d M Y, h:i A')); ?> IST · OPMW Contact System</div>
    </div>
</body>

</html><?php /**PATH D:\OPMW_One Place Multi Work\opmwfinal\opmw-backend\resources\views/emails/admin-contact.blade.php ENDPATH**/ ?>