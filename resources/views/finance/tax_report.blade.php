<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Finance Fiscal Report - {{ $month }}</title>
    <style>
        /* INLINE PREMIUM STYLING - By Antigravity */
        :root {
            --primary: #4f46e5;
            --primary-light: #e0e7ff;
            --success: #10b981;
            --danger: #f43f5e;
            --gray-900: #0f172a;
            --gray-600: #475569;
            --gray-400: #94a3b8;
            --gray-100: #f1f5f9;
        }

        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: var(--gray-900);
            line-height: 1.5;
            margin: 0;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
        }

        .container {
            max-width: 850px;
            width: 100%;
            background: white;
            padding: 60px;
            border-radius: 40px;
            box-shadow: 0 40px 100px -20px rgba(0,0,0,0.05);
            position: relative;
            overflow: hidden;
        }

        .decorative-circle {
            position: absolute;
            top: -100px;
            right: -100px;
            width: 300px;
            height: 300px;
            background: var(--primary-light);
            opacity: 0.3;
            border-radius: 50%;
            filter: blur(60px);
            z-index: 0;
        }

        header {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 60px;
            z-index: 1;
        }

        .logo-box {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
        }

        .logo-icon {
            width: 44px;
            height: 44px;
            background: var(--primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 24px;
            border-radius: 14px;
            box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
        }

        .logo-text {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: -1px;
        }

        .logo-text span { color: var(--primary); }

        .report-title {
            font-size: 42px;
            font-weight: 900;
            letter-spacing: -2px;
            margin: 0;
            color: var(--gray-900);
        }

        .badge-row {
            display: flex;
            gap: 10px;
            margin-top: 12px;
        }

        .badge {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 4px 12px;
            border-radius: 50px;
        }

        .badge-primary { background: var(--primary-light); color: var(--primary); }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 60px;
        }

        .stat-card {
            padding: 30px;
            border-radius: 28px;
            color: white;
            position: relative;
        }

        .stat-card.income { background: var(--success); box-shadow: 0 15px 30px rgba(16, 185, 129, 0.2); }
        .stat-card.expense { background: var(--danger); box-shadow: 0 15px 30px rgba(244, 63, 94, 0.2); }
        .stat-card.balance { background: var(--gray-900); box-shadow: 0 15px 30px rgba(15, 23, 42, 0.2); }

        .stat-label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; opacity: 0.7; margin-bottom: 8px; }
        .stat-value { font-size: 24px; font-weight: 800; margin: 0; font-variant-numeric: tabular-nums; }

        .info-section {
            display: flex;
            justify-content: space-between;
            background: var(--gray-100);
            padding: 30px;
            border-radius: 28px;
            margin-bottom: 60px;
        }

        .info-label { font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--gray-400); margin-bottom: 8px; }
        .info-value { font-size: 18px; font-weight: 800; margin: 0; }

        .table-title {
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: var(--gray-400);
            margin-bottom: 30px;
            border-bottom: 1px solid var(--gray-100);
            padding-bottom: 15px;
        }

        .item-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid var(--gray-100);
        }

        .item-row:last-child { border: none; }

        .item-info h4 { margin: 0; font-size: 18px; font-weight: 800; }
        .item-info p { margin: 0; font-size: 12px; color: var(--gray-400); font-weight: 600; }

        .item-values { text-align: right; }
        .val-in { color: var(--success); font-weight: 800; font-size: 16px; display: block; }
        .val-out { color: var(--danger); font-weight: 800; font-size: 16px; display: block; }

        footer {
            margin-top: 60px;
            padding-top: 30px;
            border-top: 1px solid var(--gray-100);
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            font-weight: 700;
            color: var(--gray-400);
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .actions {
            margin-top: 50px;
            display: flex;
            justify-content: center;
            gap: 15px;
        }

        .btn {
            padding: 16px 40px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-decoration: none;
            transition: 0.2s;
            cursor: pointer;
            border: none;
        }

        .btn-primary { background: var(--primary); color: white; box-shadow: 0 15px 30px rgba(79, 70, 229, 0.2); }
        .btn-gray { background: var(--gray-100); color: var(--gray-600); }

        @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; border: 1px solid #eee; width: 100%; border-radius: 0; padding: 40px; }
            .no-print { display: none !important; }
            .stat-card { border: 1px solid rgba(0,0,0,0.05); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="decorative-circle no-print"></div>

        <header>
            <div>
                <div class="logo-box">
                    <div class="logo-icon">O</div>
                    <div class="logo-text">OneForMind<span>.</span></div>
                </div>
                <h1 class="report-title">Fiscal Intelligence Report</h1>
                <div class="badge-row">
                    <span class="badge badge-primary">Automated Audit</span>
                    <span class="badge" style="color:var(--gray-400)">{{ \Carbon\Carbon::parse($month.'-01')->format('F Y') }}</span>
                </div>
            </div>
            <div style="text-align: right;" class="no-print">
                <p class="info-label">Verification Code</p>
                <p style="font-family: monospace; font-size: 12px; color: var(--gray-400);">{{ strtoupper(substr(md5($user->id . $month), 0, 12)) }}</p>
            </div>
        </header>

        <section class="stats-grid">
            <div class="stat-card income">
                <div class="stat-label">Total Income</div>
                <p class="stat-value">{{ number_format($stats['total_income'], 2) }}</p>
            </div>
            <div class="stat-card expense">
                <div class="stat-label">Total Expense</div>
                <p class="stat-value">{{ number_format($stats['total_expense'], 2) }}</p>
            </div>
            <div class="stat-card balance">
                <div class="stat-label">Fiscal Balance</div>
                @php $balance = $stats['total_income'] - $stats['total_expense']; @endphp
                <p class="stat-value">{{ $balance < 0 ? '-' : '+' }}{{ number_format(abs($balance), 2) }}</p>
            </div>
        </section>

        <section class="info-section">
            <div>
                <p class="info-label">Subject Account</p>
                <p class="info-value">{{ strtoupper($user->name) }}</p>
                <p style="font-size: 12px; font-weight: 600; color: var(--gray-600); margin-top: 4px;">{{ $user->email }}</p>
            </div>
            <div style="text-align: right;">
                <p class="info-label">Report Status</p>
                <p class="info-value" style="color: var(--success);">CERTIFIED BY AI</p>
                <p style="font-size: 12px; font-weight: 600; color: var(--gray-400); margin-top: 4px;">Gen-Date: {{ now()->format('d M Y') }}</p>
            </div>
        </section>

        <section>
            <h3 class="table-title">Categorized Flow Analysis</h3>
            <div>
                @foreach($categories as $cat)
                    @php
                        $in = $stats['income_by_category'][$cat->slug] ?? 0;
                        $out = $stats['expense_by_category'][$cat->slug] ?? 0;
                    @endphp
                    @if($in > 0 || $out > 0)
                    <div class="item-row">
                        <div class="item-info">
                            <h4>{{ $cat->name }}</h4>
                            <p>Resource Allocation Group</p>
                        </div>
                        <div class="item-values">
                            @if($in > 0) <span class="val-in">+{{ number_format($in, 2) }}</span> @endif
                            @if($out > 0) <span class="val-out">-{{ number_format($out, 2) }}</span> @endif
                        </div>
                    </div>
                    @endif
                @endforeach
            </div>
        </section>

        <footer>
            <div>ONEFORMIND INTELLIGENCE ENGINE v2.4</div>
            <div>&copy; 2026 ONEFORMIND. ALL RIGHTS RESERVED.</div>
        </footer>

        <div class="actions no-print">
            <button onclick="window.print()" class="btn btn-primary">Authorize & Save PDF</button>
            <a href="{{ route('finance.index') }}" class="btn btn-gray">Return to Dash</a>
        </div>
    </div>

    <script>
        window.onload = function() {
            setTimeout(() => {
                window.print();
            }, 800);
        };
    </script>
</body>
</html>
