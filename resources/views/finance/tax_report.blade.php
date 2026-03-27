<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Tax Summary Report - {{ $month }}</title>
    <style>
        /* OFFICIAL TAX DOCUMENT STYLING - By Antigravity */
        :root {
            --text-dark: #1a1a1a;
            --text-muted: #555555;
            --border: #dddddd;
            --accent: #000000;
        }

        body { 
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
            background-color: #ffffff;
            color: var(--text-dark);
            line-height: 1.4;
            margin: 0;
            padding: 20px;
        }

        .document {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid var(--border);
            padding: 50px;
            background: #fff;
        }

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            border-bottom: 2px solid var(--accent);
            padding-bottom: 20px;
        }

        .title-group h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .title-group p {
            margin: 5px 0 0;
            font-size: 14px;
            color: var(--text-muted);
        }

        .company-info {
            text-align: right;
            font-size: 12px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
        }

        .info-box h3 {
            font-size: 10px;
            text-transform: uppercase;
            color: var(--text-muted);
            margin: 0 0 8px;
            border-bottom: 1px solid var(--border);
            padding-bottom: 4px;
        }

        .info-box p {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
        }

        .stats-summary {
            background-color: #f9f9f9;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border: 1px solid var(--border);
            margin-bottom: 40px;
        }

        .stat-item {
            padding: 20px;
            text-align: center;
            border-right: 1px solid var(--border);
        }

        .stat-item:last-child { border-right: none; }

        .stat-label { font-size: 10px; text-transform: uppercase; margin-bottom: 5px; color: var(--text-muted); }
        .stat-value { font-size: 18px; font-weight: bold; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        th {
            text-align: left;
            font-size: 11px;
            text-transform: uppercase;
            padding: 10px;
            background-color: #eee;
            border: 1px solid var(--border);
        }

        td {
            padding: 12px 10px;
            border: 1px solid var(--border);
            font-size: 13px;
        }

        .text-right { text-align: right; }
        .text-green { color: #107c10; }
        .text-red { color: #d83b01; }

        .footer {
            border-top: 1px solid var(--border);
            padding-top: 20px;
            font-size: 10px;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
        }

        .no-print {
            margin-top: 30px;
            text-align: center;
        }

        .btn {
            background: #2b2b2b;
            color: white;
            padding: 10px 25px;
            text-decoration: none;
            font-size: 13px;
            font-weight: bold;
            border-radius: 4px;
            display: inline-block;
            margin: 0 5px;
            border: none;
            cursor: pointer;
        }

        @media print {
            body { padding: 0; }
            .document { border: none; padding: 0; width: 100%; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="document">
        <div class="header">
            <div class="title-group">
                <h1>Fiscal Report</h1>
                <p>Period: {{ \Carbon\Carbon::parse($month.'-01')->format('F Y') }}</p>
            </div>
            <div class="company-info">
                <p style="font-weight: bold; font-size: 16px;">OneForMind</p>
                <p>Unified Life OS System</p>
                <p>Digital Finance Assistant</p>
            </div>
        </div>

        <div class="info-grid">
            <div class="info-box">
                <h3>Report Subject</h3>
                <p>{{ strtoupper($user->name) }}</p>
                <p style="font-weight: normal; font-size: 12px;">{{ $user->email }}</p>
            </div>
            <div class="info-box" style="text-align: right;">
                <h3>Audit Information</h3>
                <p>Status: VERIFIED</p>
                <p style="font-weight: normal; font-size: 12px;">Generated: {{ now()->format('d M Y, H:i') }}</p>
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
