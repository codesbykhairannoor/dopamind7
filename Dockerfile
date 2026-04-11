# BUILDER STAGE: Consolidated environment with PHP and Node.js
FROM dunglas/frankenphp:1.2-php8.2-bookworm AS builder

# Install Node.js (needed for frontend build)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Install PHP extensions required for Composer and the Laravel build process
RUN install-php-extensions intl zip bcmath gd opcache pdo_mysql pcntl

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Install Node dependencies and build assets
RUN npm ci
RUN npm run build

# FINAL STAGE
FROM dunglas/frankenphp:1.2-php8.2-bookworm

# Install runtime extensions
RUN install-php-extensions pcntl intl zip pdo_mysql bcmath gd redis opcache

WORKDIR /app

# Copy the built application from builder stage
COPY --from=builder /app /app

# Set permissions for Laravel
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Make startup script executable
RUN chmod +x /app/start.sh

# Environment configuration
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# Use startup script (handles migrate + octane)
ENTRYPOINT ["/bin/bash", "/app/start.sh"]
