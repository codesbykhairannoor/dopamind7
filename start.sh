#!/bin/bash
set -e

echo "==> Running migrations..."
php artisan migrate --force

echo "==> Caching config, routes, views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "==> Starting Octane + FrankenPHP..."
exec php artisan octane:start --server=frankenphp --host=0.0.0.0 --port="${PORT:-8080}"
