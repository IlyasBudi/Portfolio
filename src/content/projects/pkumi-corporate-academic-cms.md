---
title: PKUMI Corporate Portal & Admin CMS
slug: pkumi-corporate-academic-cms
description: An enterprise-grade corporate profile, institutional portal, and content management system (CMS) built for Pendidikan Kader Ulama Masjid Istiqlal (PKU MI) featuring multi-category scholarly publishing, dynamic institutional directories, admission workflows, and modern Next.js + Laravel architecture.
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
  - /images/projects/pkumi-khazanah-publishing.png
  - /images/projects/pkumi-rubrik-management.png
  - /images/projects/pkumi-gallery-manager.png
  - /images/projects/pkumi-faq-management.png
  - /images/projects/pkumi-dark-mode.png
date: 2026-09-27
---
# PKUMI Corporate Portal & Admin CMS

<div align="center">

**An enterprise-grade corporate portal, content management system, and educational information hub for Pendidikan Kader Ulama Masjid Istiqlal (PKU MI) powered by Next.js, React, and Laravel**

</div>

---

## ✨ Features

### 🎯 **Core Functionality & Public Portal (`fe-compro`)**
- **Public Institutional Portal** - Modern company profile showcasing PKU Masjid Istiqlal's vision, history, leadership boards, lecturer directories, curriculum syllabi, and academic calendars.
- **Scholarly & Opinion Publishing Engine (Khazanah & Rubrik)** - Multi-category publication system for academic articles, opinion pieces, and student scientific essays with search, tag filtering, read counts, and trending algorithms.
- **Dynamic News & Press Releases** - Dynamic news publishing pipeline with categories, status management, image galleries, and social sharing.
- **PMB & Admission Information Hub** - Registration information, admission timelines, downloadable guidelines, curriculum syllabi, and interactive FAQs.
- **Interactive Multimedia Gallery** - Public photo and activity gallery organized by categorized event albums.

### 🛠️ **Admin Back-Office CMS (`compro-admin`)**
- **Interactive Dashboard Analytics** - Real-time statistics for articles, views, top contributors, news distribution, and recent submissions visualized with Recharts.
- **Multi-Stage Moderation Workflow** - Editorial status transitions: *Draft*, *Hold*, *Published*, *Archived*, and *Unpublished* with admin review commenting.
- **Institutional Master Data Management** - Full CRUD for leadership board members, lecturers, curriculum courses, and registration timelines.
- **Bulk Media & Gallery Management** - Multi-file drag-and-drop photo upload with album categorization and bulk deletion.
- **Trash & Soft Delete Recovery** - Safely recover or permanently purge deleted categories, news, and academic articles.
- **Contact Inbox & Inquiry Management** - Centralized management for public inquiries, contact messages, and FAQ items.

### 🎨 **Modern UI/UX**
- **🌓 Dark/Light Mode Support** - Full theme switcher powered by `next-themes` with automatic system theme detection.
- **📱 Fully Responsive Layout** - Mobile-first experience with a sleek collapsible admin sidebar and mobile navigation drawer.
- **🎭 Motion & Micro-interactions** - Immersive parallax effects, smooth page transitions, and subtle hover animations with Framer Motion and GSAP.
- **✍️ Rich Text WYSIWYG** - TipTap and Trix editors supporting embeds, formatted tables, code snippets, blockquotes, and image attachments.

### 🔐 **Security & Reliability**
- **Laravel Sanctum Authentication** - Stateful API token authentication with strict role separation (`EnsureAdmin` middleware).
- **Input Validation & Sanitization** - Robust schema validation utilizing Zod on the frontend and Laravel Form Requests on the backend.
- **Optimized Query Caching** - TanStack React Query v5 cache key partitioning preventing cross-module query collisions between Khazanah and Rubrik.
- **XSS Protection & HTML Sanitization** - Safe HTML content rendering with DOMPurify and strict server-side sanitization.

---

## 🖼️ Screenshots

<div align="center">

### 🌟 Dashboard Analytics & Content Overview
![Dashboard Overview](https://i.imgur.com/6d76UVg.png)

### 📰 Public Institutional Portal & Content Explorer
![Public Portal](https://i.imgur.com/5as4h5t.png)

### 🛡️ Article Moderation & Workflow (Khazanah & Rubrik)
![Khazanah Management](https://i.imgur.com/warINbH.png)
![Rubrik Workflow](https://i.imgur.com/HGdul72.png)

### 🌓 Dark Mode & High Contrast Support
![Dark Mode View](https://i.imgur.com/A8YvYmv.png)
![Mobile Responsive](https://i.imgur.com/Z5EHFIl.png)

</div>

---

## 🏛️ System Architecture

The application ecosystem is architected around a **Decoupled Multi-Tier Topology** separating high-traffic public browsing from administrative content management:

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     fe-compro (Public Portal)   │       │   compro-admin (Admin CMS)      │
│     Next.js 15 • Tailwind v4    │       │   Next.js 16 • TanStack Query   │
└────────────────┬────────────────┘       └────────────────┬────────────────┘
                 │                                         │
                 │ HTTP Requests                           │ Bearer Auth (Sanctum)
                 ▼                                         ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                         be-compro (RESTful API Gateway)                   │
│                         Laravel 12.x • PHP 8.2 • MySQL                    │
│                                                                           │
│  • Content Management (News, Khazanah, Rubrik, Boards, FAQs, Agendas)     │
│  • Role-Based Access Control & Sanitization Pipeline                      │
│  • In-Memory Response Normalization & Rate Limiting                       │
│  • Media & Asset Upload Pipeline                                          │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 💡 Key Engineering Highlights & Solutions

### 1. Granular Editorial State Machine & Review Workflows
- **Challenge**: Scientific publications (Khazanah) and thematic columns (Rubrik) required strict editorial oversight before becoming visible on the public portal.
- **Solution**: Developed a granular state engine supporting five publication lifecycles: *Draft*, *Hold*, *Published*, *Archived*, and *Unpublished*. Added inline reviewer comments for administrators to give constructive feedback directly to contributors before publication.

### 2. High-Performance Decoupled Architecture
- **Challenge**: The public corporate website required fast initial page loads, optimal SEO indexing, and high availability, while the admin CMS required rich, reactive client-side interactivity.
- **Solution**: Built a decoupled architecture pairing Next.js 15 with Tailwind v4 for the public portal to ensure optimal Core Web Vitals, while powering the admin back-office with Next.js 16 and a centralized Laravel 12 REST API secured by Sanctum token authentication.

### 3. Cache Partitioning & Client State Isolation
- **Challenge**: High concurrency and shared query hooks caused cache collisions between similar content categories (Khazanah vs Rubrik) during fast client navigation in the admin CMS.
- **Solution**: Restructured the frontend state layer with TanStack React Query v5 utilizing strict hierarchical query key partitioning, optimistic UI updates, and loading state guards to completely eliminate hydration flashes and stale data leakage.

### 4. Rich Text Publishing Pipeline & Sanitization
- **Challenge**: Academic writers and editors needed to compose rich articles containing blockquotes, Arabic typography, embedded media, and structured tables without risking cross-site scripting (XSS).
- **Solution**: Integrated TipTap and Trix editors with customized extensions for formatted tables, media embeds, and clean markdown output, paired with client and server-side DOMPurify sanitization.

---

## 📦 System Modules & Deliverables

| Module | Core Responsibility | Primary Technology |
| :--- | :--- | :--- |
| **Public Portal (`fe-compro`)** | Public institutional landing page, news reader, scholarly article portal, academic curriculum display, and admission guide. | Next.js 15, React 18, Tailwind CSS v4, Framer Motion, GSAP |
| **Admin CMS (`compro-admin`)** | Complete institutional back-office management, article review & moderation, curriculum manager, media library, and analytics. | Next.js 16, TypeScript, TanStack Query v5, TipTap, Recharts |
| **REST API Backend (`be-compro`)** | Centralized RESTful API, authentication authority (Sanctum), request sanitization, media processing, and content storage. | Laravel 12.x, PHP 8.2+, MySQL, Eloquent ORM |

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
