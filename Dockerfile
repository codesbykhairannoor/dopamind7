# Use specific versions to ensure stability and bypass registry IPv6 issues with 'latest'
FROM composer:2.7.2 AS composer_builder

WORKDIR /app

# Copy only composer files to leverage Docker cache
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-plugins --no-scripts --prefer-dist

# Copy the rest of the application
COPY . .
RUN composer dump-autoload --optimize --no-dev

# Frontend build stage
FROM node:20-bookworm AS node_builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Final stage: FrankenPHP
FROM dunglas/frankenphp:1-php8.2-bookworm

# Install system dependencies and PHP extensions
RUN install-php-extensions \
    pcntl \
    intl \
    zip \
    pdo_mysql \
    bcmath \
    gd \
    opcache \
    redis

# Set working directory
WORKDIR /app

# Copy application from build stages
COPY --from=composer_builder /app /app
COPY --from=node_builder /app/public/build /app/public/build
COPY --from=node_builder /app/bootstrap/ssr /app/bootstrap/ssr

# Set permissions for Laravel
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Environment configuration
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

# Use the default FrankenPHP entrypoint
ENTRYPOINT ["php", "artisan", "octane:start", "--server=frankenphp", "--host=0.0.0.0", "--port=8080"]
