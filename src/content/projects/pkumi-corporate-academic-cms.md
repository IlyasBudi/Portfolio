---
title: PKUMI Corporate & Academic CMS Portal
slug: pkumi-corporate-academic-cms
description: An enterprise-grade corporate profile, academic CMS, and educational information system built for Pendidikan Kader Ulama Masjid Istiqlal (PKU MI) featuring seamless SIAKAD academic data synchronization, rich multi-content publishing, and modern Next.js + Laravel architecture.
category: Fullstack Web Application
featured: true
techStack:
  - Laravel
  - Next.js
  - React
  - TypeScript
  - MySQL
  - Tailwind CSS
  - Laravel Sanctum
  - TanStack Query
  - TipTap Editor
  - Radix UI
demoLink: "#"
githubLink: "#"
image:
  - /images/projects/pkumi-dashboard-overview.png
  - /images/projects/pkumi-landing-page.png
  - /images/projects/pkumi-academic-students.png
  - /images/projects/pkumi-khazanah-publishing.png
  - /images/projects/pkumi-rubrik-management.png
  - /images/projects/pkumi-student-khs-grades.png
  - /images/projects/pkumi-gallery-manager.png
  - /images/projects/pkumi-faq-management.png
  - /images/projects/pkumi-dark-mode.png
date: 2026-09-27
---
# PKUMI Corporate & Academic CMS Portal

<div align="center">

**An enterprise-grade corporate portal, academic CMS, and educational information ecosystem for Pendidikan Kader Ulama Masjid Istiqlal (PKU MI) powered by Next.js, Laravel, and real-time SIAKAD integration**

</div>

---

## ✨ Features

### 🎯 **Core Functionality**
- **Public Institutional Portal (`fe-compro`)** - Modern company profile showcasing PKU Masjid Istiqlal's vision, history, leadership boards, lecturer directories, academic calendars, curriculum, and admissions.
- **Scholarly & Opinion Publishing Engine (Khazanah & Rubrik)** - Multi-category publication system for academic articles, opinion pieces, and student scientific essays with search, tag filtering, read counts, and trending algorithms.
- **Comprehensive News & Press Releases** - Dynamic news publishing pipeline with categories, status management, image galleries, and social sharing.
- **Real-Time SIAKAD Academic Synchronization** - Zero-import real-time data bridging with the academic grading system (`penilaian`) as Single Source of Truth (SST).
- **PMB & Admission Hub** - Registration information, admission timelines, downloadable guidelines, curriculum syllabi, and interactive FAQs.

### 🎓 **Academic & SIAKAD Integration**
- **BFF (Backend-for-Frontend) Gateway** - Secure server-to-server communication between `be-compro` and `penilaian` utilizing Bearer Sync Tokens.
- **Smart Data Sanitization** - Automatic algorithm resolving study programs (`S2 PKU`, `S2 PKUP`, `S3 PKU`) and stripping broken legacy formulas (`=G451`, `=G480`, etc.).
- **Automatic 4-Digit Admission Year Resolution** - Extracted reliably from cohort naming patterns or student NIM identifiers.
- **Live KHS & Transcript Explorer** - View course enrollments, semester credits (SKS), letter grades, grade points, and dynamic 2-decimal GPA calculation.

### 🎨 **Modern UI/UX**
- **🌓 Dark/Light Mode Support** - Full theme switcher powered by `next-themes` with automatic system theme detection.
- **📱 Fully Responsive Layout** - Mobile-first experience with a sleek collapsible admin sidebar and mobile navigation drawer.
- **🎭 Motion & Micro-interactions** - Immersive parallax effects, smooth page transitions, and subtle hover animations with Framer Motion and GSAP.
- **✍️ Rich Text WYSIWYG** - TipTap and Trix editors supporting embeds, formatted tables, code snippets, blockquotes, and image attachments.

### 🔐 **Security & Reliability**
- **Laravel Sanctum Authentication** - Stateful API token authentication with strict role separation (`EnsureAdmin` and `EnsureStudent`).
- **HMAC / Server Sync Token** - Protected internal synchronization routes preventing unauthorized access to raw student academic records.
- **Input Validation & Sanitization** - Robust schema validation utilizing Zod on the frontend and Laravel Form Requests on the backend.
- **Optimized Query Caching** - TanStack React Query v5 cache key partitioning preventing cross-module query collisions.

### 🛠️ **Admin Panel Features (`compro-admin`)**
- **Dashboard Analytics** - Real-time statistics for articles, views, top contributors, news distribution, and recent student submissions via Recharts.
- **Multi-Stage Moderation Workflow** - Editorial status transitions: *Draft*, *Hold*, *Published*, *Archived*, and *Unpublished* with admin review commenting.
- **Bulk Media & Gallery Management** - Multi-file drag-and-drop photo upload with album categorization and bulk deletion.
- **Trash & Soft Delete Recovery** - Safely recover or permanently purge deleted categories, news, and academic articles.

---

## 🖼️ Screenshots

<div align="center">

### 🌟 Dashboard Analytics & Content Overview
![Dashboard Overview](https://i.imgur.com/6d76UVg.png)

### 👥 Academic Student Directory & Real-Time KHS Grades
![Academic Students](https://i.imgur.com/5as4h5t.png)

### 🛡️ Article Moderation & Workflow (Khazanah & Rubrik)
![Khazanah Management](https://i.imgur.com/warINbH.png)
![Rubrik Workflow](https://i.imgur.com/HGdul72.png)

### 🌓 Dark Mode & High Contrast Support
![Dark Mode View](https://i.imgur.com/A8YvYmv.png)
![Mobile Responsive](https://i.imgur.com/Z5EHFIl.png)

</div>

---

## 🏛️ System Architecture

The application ecosystem is architected around a **Decoupled Multi-Tier & BFF (Backend-for-Frontend)** topology to separate high-traffic public browsing from sensitive academic operations:

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     fe-compro (Public Portal)   │       │   compro-admin (Admin CMS)      │
│     Next.js 15 • Tailwind v4    │       │   Next.js 16 • TanStack Query   │
└────────────────┬────────────────┘       └────────────────┬────────────────┘
                 │                                         │
                 │ HTTP Requests                           │ Bearer Auth (Sanctum)
                 ▼                                         ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         be-compro (BFF API Gateway)                       │
│                         Laravel 12.x • PHP 8.2 • MySQL                    │
│                                                                           │
│  • Content Management (News, Khazanah, Rubrik, Boards, FAQs, Agendas)     │
│  • Role-Based Access Control & Sanitization Pipeline                      │
│  • In-Memory Response Normalization & Rate Limiting                       │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      │ Internal S2S Request (HMAC / Sync Token)
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                      penilaian (Academic SIAKAD Core)                     │
│                      Single Source of Truth (SST)                         │
│                                                                           │
│  • Master Data: Classes, Academic Years, Semesters, Study Programs        │
│  • Academic Records: Student Enrollments, Course Grades, IPK Calculations │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 💡 Key Engineering Highlights & Solutions

### 1. Zero-Import Real-Time Academic Synchronization
- **Challenge**: Previously, updating student cohorts and academic grades required repeated manual Excel re-imports, which frequently resulted in out-of-sync grades and duplicate profile records.
- **Solution**: Implemented a server-to-server BFF Gateway connecting the admin dashboard directly to the internal SIAKAD system via secure token authentication, establishing a **Single Source of Truth (SST)**. Changes in student status or grades reflect instantly across the ecosystem without any manual data re-import.

### 2. Intelligent Data Sanitization & Normalization
- **Challenge**: Legacy data migrations introduced broken spreadsheet formula strings (such as `=G451`, `=G480`) and dummy entries into production databases, causing corrupt dropdown filters.
- **Solution**: Engineered a multi-tier sanitization algorithm that dynamically detects and cleans formula artifacts, maps official study programs (`S2 PKU`, `S2 PKUP`, `S3 PKU`) using official NIM nomenclature rules, and extracts standardized 4-digit admission years.

### 3. Editorial State Machine & Review Workflows
- **Challenge**: Scientific publications (Khazanah) and thematic columns (Rubrik) required strict editorial oversight before becoming visible on the public portal.
- **Solution**: Developed a granular state engine supporting five publication lifecycles: *Draft*, *Hold*, *Published*, *Archived*, and *Unpublished*. Added inline reviewer comments for administrators to give feedback directly to student contributors before publication.

### 4. Cache Partitioning & Client State Isolation
- **Challenge**: High concurrency and shared query hooks caused cache collisions between similar content categories (Khazanah vs Rubrik) during fast client navigation.
- **Solution**: Restructured the frontend state layer with TanStack React Query v5 utilizing strict hierarchical query key partitioning, optimistic UI updates, and loading state guards to completely eliminate hydration flashes and stale data leakage.

---

## 📦 System Modules & Deliverables

| Module | Core Responsibility | Primary Technology |
| :--- | :--- | :--- |
| **Public Portal (`fe-compro`)** | Public institutional landing page, news reader, scholarly article portal, academic curriculum display, and admission guide. | Next.js 15, React 18, Tailwind CSS v4, Framer Motion, GSAP |
| **Admin CMS (`compro-admin`)** | Complete institutional back-office management, article review & moderation, student academic explorer, media library, and analytics. | Next.js 16, TypeScript, TanStack Query v5, TipTap, Recharts |
| **API Gateway (`be-compro`)** | Centralized RESTful API, authentication authority (Sanctum), request sanitization, and BFF bridge to SIAKAD. | Laravel 12.x, PHP 8.2+, MySQL, Eloquent ORM |
| **SIAKAD Core (`penilaian`)** | Academic Single Source of Truth managing classes, course rosters, grading weights, GPA formulas, and KHS records. | Laravel, MySQL, HMAC Microservice Bridge |

---

## Acknowledgments
- [Laravel](https://laravel.com)
- [Next.js](https://nextjs.org)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TanStack Query](https://tanstack.com/query)
- [TipTap Editor](https://tiptap.dev)
- [Radix UI](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)
- [Framer Motion](https://www.framer.com/motion)

**Made by [IlyasBudi](https://github.com/IlyasBudi)**
