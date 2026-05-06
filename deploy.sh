#!/bin/bash
# deploy.sh — Jalankan setelah git pull di server production
# Usage: bash deploy.sh

set -e

echo "🚀 Starting deployment..."

# 1. Install PHP dependencies (no dev)
composer install --no-dev --optimize-autoloader --no-interaction

# 2. Build frontend assets
npm ci --production=false
npm run build

# 3. Run migrations
php artisan migrate --force

# 4. Cache everything — INI YANG BIKIN CEPAT
php artisan optimize
# php artisan optimize = shortcut untuk:
#   config:cache + route:cache + view:cache + event:cache

# 5. Restart Octane workers agar pakai cache baru
php artisan octane:reload

echo "✅ Deployment complete!"
