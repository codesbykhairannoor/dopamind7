<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #efefef; border-radius: 8px; }
        .header { font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #4f46e5; }
        .info { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .message { padding: 15px; background: #f9f9f9; border-left: 4px solid #4f46e5; margin-top: 10px; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">OneForMind Support Request</div>
        <div class="info"><span class="label">Name:</span> {{ $data['name'] }}</div>
        <div class="info"><span class="label">Email:</span> {{ $data['email'] }}</div>
        <div class="info"><span class="label">Subject:</span> {{ ucfirst($data['subject']) }}</div>
        <div class="label">Message:</div>
        <div class="message">
            {!! nl2br(e($data['message'])) !!}
        </div>
    </div>
</body>
</html>
