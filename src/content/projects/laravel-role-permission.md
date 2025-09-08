---
title: Laravel Role Permission
slug: laravel-role-permission
description: A modern, feature-rich role and permission management system for
  Laravel applications with beautiful UI and comprehensive admin panel starter
  kit.
category: Starter Kit
featured: false
techStack:
  - Laravel
  - Mysql
  - Tailwind CSS
  - Sanctum
  - Spatie
demoLink: "#"
githubLink: https://github.com/IlyasBudi/Laravel-RolePermission
image:
  - /images/projects/screenshot-2025-09-08-230613.png
  - /images/projects/screenshot-2025-09-08-230554.png
  - /images/projects/Screenshot 2025-09-08 231752.png
  - /images/projects/screenshot-2025-09-08-230657.png
  - /images/projects/screenshot-2025-09-08-230719.png
  - /images/projects/screenshot-2025-09-08-230736.png
  - /images/projects/Screenshot 2025-09-08 231530.png
  - /images/projects/Screenshot 2025-09-08 231549.png
  - /images/projects/Screenshot 2025-09-08 231604.png
  - /images/projects/Screenshot 2025-09-08 231708.png
date: 2025-09-08
---
# Laravel Role & Permission Starter Kit

<div align="center">

**A modern, feature-rich role and permission management system for Laravel applications with beautiful UI and comprehensive admin panel**



</div>

---

## ✨ Features

### 🎯 **Core Functionality**
- **Complete Role Management** - Create, edit, and manage user roles with ease
- **Advanced Permission System** - Fine-grained permission control with role-based and direct user permissions
- **User Management** - Comprehensive user administration with role assignments
- **Authentication System** - Secure login/register with password reset functionality

### 🎨 **Modern UI/UX**
- **🌓 Dark/Light Mode** - Automatic theme detection with manual toggle
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **🎭 Beautiful Interface** - Modern design with Tailwind CSS and smooth animations
- **⚡ Interactive Elements** - Alpine.js powered components for enhanced user experience

### 🔐 **Security Features**
- **Laravel Sanctum Integration** - API authentication ready
- **Spatie Permission Package** - Industry-standard permission management
- **Middleware Protection** - Route protection with role and permission checks
- **Secure Password Handling** - Bcrypt encryption with password strength requirements

### 🛠️ **Admin Panel Features**
- **Dashboard Analytics** - User and system statistics
- **Bulk Operations** - Mass user management capabilities
- **Search & Filtering** - Advanced search across all entities

---

## 🖼️ Screenshots

<div align="center">

### 🌟 Dashboard Overview
![Dashboard](https://i.imgur.com/6d76UVg.png)

### 👥 User Management
![User Management](https://i.imgur.com/5as4h5t.png)

### 🛡️ Role & Permission System
![Roles](https://i.imgur.com/warINbH.png)
![permissions](https://i.imgur.com/HGdul72.png)

### 🌓 Dark Mode Support
![Dark Mode](https://i.imgur.com/A8YvYmv.png)
![Dark Mode](https://i.imgur.com/Z5EHFIl.png)

</div>

---

## ⚡ Installation

### 📋 Prerequisites
- PHP 8.1 or higher
- Laravel 12.x
- Composer

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/IlyasBudi/Laravel-RolePermission.git
   cd Laravel-RolePermission
2. **Install dependencies**
   ```bash
   # Install PHP dependencies
   composer install
3. **Environment setup**
   ```bash
   # Copy environment file
   cp .env.example .env
   
   # Generate application key
   php artisan key:generate
4. **Database configuration**
   ```bash
   # Update .env with your database credentials
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
5. **Run migrations and seeders**
   ```bash
   # Run migrations
   php artisan migrate
   
   # Seed the database with sample data
   php artisan db:seed
6. Start the application
   ```bash
   php artisan serve
7. Access the application
- URL: http://localhost:8000
- Default Admin: admin@example.com / password

## 📖Usage Guide
### 🎯 Basic Usage

- **Controller Directives**
   ```bash
   public static function middleware(): array
    {
        return [
            // Always need to login
            new ControllerMiddleware('auth'),

            // List roles
            (new ControllerMiddleware('permission:roles.index|roles.view'))->only(['index']),

            // Form create + store
            (new ControllerMiddleware('permission:roles.create'))->only(['create','store']),

            // Form edit + update nama role
            (new ControllerMiddleware('permission:roles.update'))->only(['edit','update']),

            // Destroy role
            (new ControllerMiddleware('permission:roles.delete'))->only(['destroy']),

            // Synchronize permissions to roles
            (new ControllerMiddleware('permission:roles.sync-permissions|roles.update'))->only(['syncPermissions']),
        ];
    }

- **Blade Directives**
   ```bash
   {{-- Check roles in views --}}
   @role('admin')
       <p>You are an admin!</p>
   @endrole
   
   {{-- Check permissions in views --}}
   @can('edit posts')
       <a href="{{ route('posts.edit', $post) }}">Edit Post</a>
   @endcan
   
   {{-- Check multiple roles --}}
   @hasanyrole('admin|editor')
       <p>You have admin or editor access!</p>
   @endhasanyrole

## 🏗️ Project Structure
   ```bash
Laravel-RolePermission/
├── 📁 app/
│   ├── 📁 Http/
│   │   ├── 📁 Controllers/
│   │   │   ├── 📁 Admin/          # Admin panel controllers
│   │   │   └── 📁 Auth/           # Authentication controllers
│   │   └── 📁 Middleware/         # Custom middleware
│   ├── 📁 Models/                 # Eloquent models
│   └── 📁 Providers/              # Service providers
├── 📁 resources/
│   ├── 📁 views/
│   │   ├── 📁 admin/              # Admin panel views
│   │   ├── 📁 auth/               # Authentication views
│   │   └── 📁 layouts/            # Layout templates
│   └── 📁 js/                     # JavaScript assets
├── 📁 database/
│   ├── 📁 migrations/             # Database migrations
│   └── 📁 seeders/                # Database seeders
└── 📁 routes/
    ├── web.php                    # Web routes
    └── api.php                    # API routes
```
## 🔧 Configuration
   ```bash
   # Application
   APP_NAME="Laravel Role Permission"
   APP_ENV=local
   APP_DEBUG=true
   APP_URL=http://localhost
   
   # Database
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel_rolepermission
   DB_USERNAME=root
   DB_PASSWORD=
   
   # Mail
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=email@domain.com
   MAIL_PASSWORD=app-password-or-password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS="no-reply@domain.com"
   MAIL_FROM_NAME="${APP_NAME}"
   ```

### Permission Configuration
The system uses Spatie Permission package. You can publish and modify the config:
   ```bash
   php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```
## Acknowledgments
- Laravel
- Sanctum
- Spatie Permission
- Tailwind CSS
- Alpine.js 
- Heroicons

**Made by [IlyasBudi](https://github.com/IlyasBudi)**
