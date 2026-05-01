<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tax Summary Report - {{ $month }}</title>
    <style>
        /* PREMIUM FISCAL REPORT STYLING - OneForMind Intelligence */
        :root {
            --primary: #4f46e5;
            --text-dark: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
            --bg-light: #f8fafc;
            --success: #059669;
            --danger: #dc2626;
        }

        @page {
            margin: 20mm;
            size: A4;
        }

        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #ffffff;
            color: var(--text-dark);
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact;
        }

        .document {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
            background: #fff;
            position: relative;
        }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120px;
            font-weight: 900;
            color: rgba(0,0,0,0.02);
            z-index: 0;
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 50px;
            border-bottom: 4px solid var(--text-dark);
            padding-bottom: 25px;
            position: relative;
            z-index: 1;
        }

        .title-group h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -0.025em;
            color: var(--text-dark);
        }

        .title-group p {
            margin: 8px 0 0;
            font-size: 14px;
            font-weight: 600;
            color: var(--primary);
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }

        .company-branding {
            text-align: right;
        }

        .logo-text {
            font-weight: 900;
            font-size: 20px;
            letter-spacing: -0.05em;
            margin: 0;
        }

        .tagline {
            font-size: 10px;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin: 2px 0 0;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 60px;
            margin-bottom: 50px;
            position: relative;
            z-index: 1;
        }

        .info-box h3 {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            color: var(--text-muted);
            margin: 0 0 10px;
            letter-spacing: 0.05em;
        }

        .info-box p {
            margin: 2px 0;
            font-size: 15px;
            font-weight: 700;
        }

        .status-badge {
            display: inline-block;
            background: #f1f5f9;
            color: #475569;
            padding: 4px 12px;
            border-radius: 99px;
            font-size: 10px;
            font-weight: 800;
            margin-top: 5px;
        }

        .stats-summary {
            background-color: var(--bg-light);
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid var(--border);
            margin-bottom: 50px;
            position: relative;
            z-index: 1;
        }

        .stat-item {
            padding: 30px 20px;
            text-align: center;
            border-right: 1px solid var(--border);
        }

        .stat-item:last-child { border-right: none; }

        .stat-label { 
            font-size: 11px; 
            font-weight: 700; 
            text-transform: uppercase; 
            margin-bottom: 8px; 
            color: var(--text-muted);
            letter-spacing: 0.05em;
        }
        .stat-value { font-size: 22px; font-weight: 900; letter-spacing: -0.02em; }

        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 50px;
            position: relative;
            z-index: 1;
        }

        th {
            text-align: left;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 15px 12px;
            background-color: #f8fafc;
            border-top: 1px solid var(--text-dark);
            border-bottom: 1px solid var(--text-dark);
            letter-spacing: 0.05em;
        }

        td {
            padding: 15px 12px;
            border-bottom: 1px solid var(--border);
            font-size: 14px;
            font-weight: 500;
        }

        .text-right { text-align: right; }
        .text-green { color: var(--success); }
        .text-red { color: var(--danger); }

        .footer {
            border-top: 1px solid var(--border);
            padding-top: 30px;
            font-size: 10px;
            font-weight: 600;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
            position: relative;
            z-index: 1;
        }

        .no-print {
            margin-top: 50px;
            text-align: center;
            padding-bottom: 40px;
        }

        .btn {
            background: var(--text-dark);
            color: white;
            padding: 14px 30px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 800;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin: 0 8px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
        }

        @media print {
            body { padding: 0; }
            .document { border: none; padding: 20px; width: 100%; max-width: none; }
            .no-print { display: none !important; }
            .btn { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="document">
        <div class="watermark">ONEFORMIND</div>
        <div class="header">
            <div class="title-group">
                <h1>Fiscal Report</h1>
                <p>{{ \Carbon\Carbon::parse($month.'-01')->format('F Y') }}</p>
            </div>
            <div class="company-branding">
                <p class="logo-text">ONEFORMIND</p>
                <p class="tagline">UNIFIED LIFE OS SYSTEM</p>
            </div>
        </div>

        <div class="info-grid">
            <div class="info-box">
                <h3>Report Subject</h3>
                <p style="font-size: 18px;">{{ strtoupper($user->name) }}</p>
                <p style="font-weight: 500; color: var(--text-muted);">{{ $user->email }}</p>
            </div>
            <div class="info-box" style="text-align: right;">
                <h3>System Verification</h3>
                <div class="status-badge">AUTHENTICATED REPORT</div>
                <p style="font-weight: 500; font-size: 12px; color: var(--text-muted); margin-top: 8px;">Generated: {{ now()->format('d M Y, H:i') }}</p>
            </div>
        </div>

        <div class="stats-summary">
            <div class="stat-item">
                <div class="stat-label">Total Credits</div>
                <div class="stat-value text-green">+{{ number_format($stats['total_income'], 2) }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Total Debits</div>
                <div class="stat-value text-red">-{{ number_format($stats['total_expense'], 2) }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Net Fiscal Flow</div>
                @php $balance = $stats['total_income'] - $stats['total_expense']; @endphp
                <div class="stat-value {{ $balance < 0 ? 'text-red' : 'text-green' }}">
                    {{ $balance < 0 ? '-' : '+' }}{{ number_format(abs($balance), 2) }}
                </div>
            </div>
        </div>

        <h3>Categorized Breakdown</h3>
        <table>
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th class="text-right">Incoming</th>
                    <th class="text-right">Outgoing</th>
                </tr>
            </thead>
            <tbody>
                @foreach($categories as $cat)
                    @php
                        $in = $stats['income_by_category'][$cat->slug] ?? 0;
                        $out = $stats['expense_by_category'][$cat->slug] ?? 0;
                    @endphp
                    @if($in > 0 || $out > 0)
                    <tr>
                        <td><strong>{{ $cat->name }}</strong></td>
                        <td class="text-right {{ $in > 0 ? 'text-green' : '' }}">{{ $in > 0 ? '+' . number_format($in, 2) : '-' }}</td>
                        <td class="text-right {{ $out > 0 ? 'text-red' : '' }}">{{ $out > 0 ? '-' . number_format($out, 2) : '-' }}</td>
                    </tr>
                    @endif
                @endforeach
            </tbody>
        </table>

        <div class="footer">
            <div>Document Code: {{ strtoupper(substr(md5($user->id . $month), 0, 16) ) }}</div>
            <div>&copy; 2026 OneForMind Intelligence</div>
        </div>

        <div class="no-print">
            <button onclick="window.print()" class="btn">Print as PDF Now</button>
            <a href="{{ route('finance.index') }}" class="btn" style="background:#eee; color:#333;">Close</a>
        </div>
    </div>
</body>
</html>
