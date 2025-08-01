# Portfolio Website - Next.js 14 & Tailwind CSS

A modern, responsive portfolio website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Features markdown-based content management, dark mode, smooth animations, and project filtering capabilities.

## 🚀 Features

### Core Features
- **Next.js 14 App Router** - Latest Next.js with improved performance and developer experience
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Responsive Design** - Mobile-first approach that works on all devices
- **Dark Mode** - Toggle between light and dark themes with system preference detection
- **Smooth Animations** - Framer Motion powered animations and transitions

### Content Management
- **Markdown-based Content** - Easy content management using markdown files
- **Project Showcase** - Dynamic project pages with detailed information
- **Category Filtering** - Filter projects by technology or category
- **Search Functionality** - Search through projects by title, description, or tech stack
- **Featured Projects** - Highlight your best work on the homepage

### User Experience
- **Contact Form** - React Hook Form powered contact form with validation
- **Social Media Integration** - Links to all your social profiles
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Card support
- **Performance Optimized** - Static site generation for fast loading times

## 📁 Project Structure

```
portfolio-website/
├── public/
│   └── images/
│       └── projects/          # Project images
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/
│   │   ├── contact/
│   │   ├── projects/
│   │   │   └── [slug]/        # Dynamic project pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Reusable components
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── NavigationWrapper.tsx
│   │   ├── ProjectCard.tsx
│   │   └── ThemeProvider.tsx
│   ├── content/               # Markdown content
│   │   └── projects/          # Project markdown files
│   ├── lib/                   # Utility functions
│   │   ├── config.ts          # Site configuration
│   │   └── markdown.ts        # Markdown processing
│   └── types/                 # TypeScript type definitions
│       └── index.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## ⚙️ Configuration

### Site Configuration

Edit `src/lib/config.ts` to customize your portfolio:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  url: "https://yourwebsite.com",
  email: "your@email.com",
  phone: "+1 234 567 8900",
  location: "Your City, Country",
  
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    instagram: "https://instagram.com/yourusername",
  },
  
  navigation: [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    // Add more skill categories...
  ],
  
  experience: [
    {
      company: "Company Name",
      position: "Your Position",
      duration: "2022 - Present",
      description: "Description of your role"
    },
    // Add more experience...
  ]
};
```

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_SITE_URL=https://yourwebsite.com
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
```

## 📝 Content Management

### Adding New Projects

1. **Create a new markdown file** in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "Brief project description"
category: "Web Development"
featured: true
techStack: ["Next.js", "TypeScript", "Tailwind CSS"]
demoLink: "https://demo.com"
githubLink: "https://github.com/username/project"
image: "/images/projects/project-name.jpg"
date: "2024-01-15"
---

# Project Name

Detailed project description goes here...

## Key Features

- Feature 1
- Feature 2
- Feature 3

## Technical Implementation

Explain the technical aspects...

## Challenges & Solutions

Describe challenges faced and how you solved them...

## Results

Share the outcomes and impact...
```

2. **Add project image** to `public/images/projects/`

3. **The project will automatically appear** on the projects page and homepage (if featured)

### Project Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Project title |
| `description` | string | ✅ | Brief description for cards |
| `category` | string | ✅ | Project category for filtering |
| `featured` | boolean | ✅ | Show on homepage |
| `techStack` | array | ✅ | Technologies used |
| `demoLink` | string | ❌ | Live demo URL |
| `githubLink` | string | ❌ | Source code URL |
| `image` | string | ✅ | Project image path |
| `date` | string | ✅ | Project date (YYYY-MM-DD) |

### Updating Personal Information

1. **Profile Information**: Edit `src/lib/config.ts`
2. **About Page Content**: Edit `src/app/about/page.tsx`
3. **Profile Image**: Replace the gradient placeholder in the about page with your actual photo

## 🎨 Customization

### Styling & Themes

The website uses Tailwind CSS for styling. Key customization points:

1. **Colors**: Modify `tailwind.config.ts` to change the color scheme
2. **Fonts**: Update font imports in `src/app/layout.tsx`
3. **Dark Mode**: Customize dark mode styles using Tailwind's `dark:` prefix

### Adding New Pages

1. Create a new folder in `src/app/`
2. Add a `page.tsx` file with your component
3. Update navigation in `src/lib/config.ts`

### Custom Components

All components are in `src/components/`. Key components:

- **Navigation.tsx**: Main navigation bar
- **ProjectCard.tsx**: Project display cards
- **ContactForm.tsx**: Contact form with validation
- **ThemeProvider.tsx**: Dark mode functionality

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Other Platforms

The website generates static files and can be deployed to any static hosting service.

## 📱 Responsive Design

The website is fully responsive and tested on:

- **Desktop**: 1920px and above
- **Laptop**: 1024px - 1919px  
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## ⚡ Performance

- **Lighthouse Score**: 98+ performance score
- **Static Generation**: All pages pre-rendered for fast loading
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal loading

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Quality

- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict mode enabled for type safety
- **Prettier**: Code formatting (configure in your editor)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](#-content-management)
2. Search existing [issues](https://github.com/username/portfolio-website/issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Lucide React** - For beautiful icons

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS

