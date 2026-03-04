# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**OneForMind** is a personal productivity platform built as a Modern Monolith using Laravel 11 + Inertia.js + Vue 3. It integrates three core productivity pillars: Atomic Habits, Financial Clarity, and Intentional Planning.

**Tech Stack:**
- Backend: Laravel 11 (PHP 8.2+)
- Frontend: Vue 3 (Composition API) + Inertia.js
- Styling: Tailwind CSS + DaisyUI
- Database: MySQL
- Build: Vite with SSR support
- Testing: Pest/PHPUnit

## Development Commands

### Setup & Installation
```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed database (if needed)
php artisan db:seed
```

### Development Server
```bash
# Start Laravel development server
php artisan serve

# Start Vite dev server (in separate terminal)
npm run dev
```

### Building for Production
```bash
# Build frontend assets (includes Ziggy route generation and SSR build)
npm run build
```

### Testing
```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/FinanceTest.php

# Run tests with coverage
php artisan test --coverage

# Run PHPUnit directly
vendor/bin/phpunit

# Run Pest directly
vendor/bin/pest
```

### Code Quality
```bash
# Run Laravel Pint (code formatter)
vendor/bin/pint

# Run Larastan (static analysis)
vendor/bin/phpstan analyse

# Clear all caches
php artisan optimize:clear
```

### Debugging Tools
```bash
# Laravel Telescope (available in dev)
# Access at: /telescope

# Laravel Debugbar (available in dev)
# Visible at bottom of browser when enabled
```

## Architecture & Structure

### Backend Architecture (Laravel)

**Controllers** (`app/Http/Controllers/`):
- Follow resource controller pattern for CRUD operations
- Main feature controllers: `FinanceController`, `HabitController`, `PlannerController`, `JournalController`, `CalendarController`
- Auth controllers in `Auth/` subdirectory
- Return Inertia responses with props for Vue components

**Models** (`app/Models/`):
- Key models: `User`, `Habit`, `HabitLog`, `FinanceTransaction`, `FinanceBudget`, `FinanceCategory`, `Journal`, `CalendarEvent`, `DailyLog`, `Mood`, `Period`
- Use Eloquent relationships extensively
- Follow Laravel naming conventions

**Routes** (`routes/web.php`):
- Language switching route: `/lang/{locale}` (supports 'id' and 'en')
- Public routes for guest users
- Authenticated routes grouped with middleware
- Uses named routes for Ziggy integration

### Frontend Architecture (Vue 3 + Inertia)

**Directory Structure** (`resources/js/`):
- `Components/` - Reusable UI components (Cards, Modals, Forms)
- `Composables/` - Logic hooks organized by feature (Finance, Habits, Journal, Planner, Calendar)
- `Layouts/` - `AuthenticatedLayout.vue` and `GuestLayout.vue`
- `Pages/` - Inertia page components organized by feature
- `Utils/` - Utility functions

**Key Patterns:**
- Uses Vue 3 Composition API exclusively
- Composables encapsulate feature-specific logic and state management
- Inertia.js handles SPA-like navigation without full page reloads
- Props passed from Laravel controllers to Vue pages via Inertia

**Important Frontend Libraries:**
- `@inertiajs/vue3` - SPA experience without API
- `laravel-vue-i18n` - Multi-language support (ID/EN)
- `chart.js` + `vue-chartjs` - Data visualization
- `dayjs` - Date manipulation
- `sweetalert2` - Alerts and confirmations
- `@tiptap/vue-3` - Rich text editor
- `lucide-vue-next` - Icon library
- `nprogress` - Loading bar

### Translation System

**Custom Translation Workflow:**
- Partial translation files stored in `lang/partials/{locale}/` (e.g., `lang/partials/id/finance.json`)
- Vite plugin automatically merges partials into `lang/{locale}.json` on build/dev
- Changes to partial files trigger hot reload
- Use `laravel-vue-i18n` package in Vue components: `trans('key')`

### Database

**Connection:** MySQL (configured in `.env`)
- Test database: `Dopamind` (as per `phpunit.xml`)
- Migrations in `database/migrations/`
- Uses Eloquent ORM

### Image Handling

**Cloudinary Integration:**
- Package: `cloudinary-labs/cloudinary-laravel`
- Also uses `intervention/image-laravel` for image manipulation
- AWS S3 support via `league/flysystem-aws-s3-v3`

### Authentication

- Laravel Breeze for authentication scaffolding
- Laravel Sanctum for API token authentication
- Social login via `laravel/socialite` (Google OAuth)
- Session-based auth for web routes

## Important Production Notes

### HTTPS & Session Configuration
- `AppServiceProvider` forces HTTPS in production
- `TrustProxies` configured with `$proxies = '*'`
- Set `SESSION_SECURE_COOKIE=true` in production `.env`
- Set `SESSION_DOMAIN=.yourdomain.com` if using custom domain

### Language Switching Edge Case
- `/lang/{locale}` route uses `Inertia::location()` for Inertia requests to force full reload
- This prevents JSON dumps and modal loops when switching languages
- After editing layouts, rebuild assets and clear caches: `php artisan route:clear view:clear config:cache`

### Build Process
- `npm run build` generates Ziggy routes, builds assets, and creates SSR bundle
- Vite splits vendor chunks for optimal loading (vue, inertia, utils, core)
- SSR entry point: `resources/js/ssr.js`

## Development Workflow

1. **Feature Development:**
   - Create migration if database changes needed
   - Add/update model with relationships
   - Create/update controller with Inertia responses
   - Add route in `routes/web.php`
   - Create Vue page component in `resources/js/Pages/`
   - Create composable for complex logic in `resources/js/Composables/`
   - Add translations in `lang/partials/{locale}/`

2. **Testing:**
   - Write feature tests in `tests/Feature/`
   - Write unit tests in `tests/Unit/`
   - Run tests before committing

3. **Code Style:**
   - Run `vendor/bin/pint` to format PHP code
   - Follow Vue 3 Composition API patterns
   - Use TypeScript-style JSDoc comments where helpful

## Key Files

- `vite.config.js` - Custom translation merging plugin, SSR config, chunk splitting
- `phpunit.xml` - Test configuration with MySQL test database
- `composer.json` - PHP dependencies (Laravel 10, Inertia, Sanctum, Socialite, Cloudinary)
- `package.json` - Node dependencies and build scripts
- `tailwind.config.js` - Tailwind configuration
- `.env` - Environment configuration (not in git)
