# Garlic and Ginger - Recipe Site

A Next.js recipe website that uses WordPress as a headless CMS with the Recipe Card Blocks plugin.

## Features

- 🍳 Recipe listing and detail pages
- 📝 Blog section
- 🎨 Custom "Annie Use Your Telescope" font for branding
- 🚀 Built with Next.js 15+ and CSS Modules
- 📱 Responsive design
- ⚡ Server-side rendering with WordPress integration
- 🧩 Modular component architecture
- 🎯 Reusable UI components following best practices

## Prerequisites

- Node.js 18+ 
- A WordPress site with:
  - [WPGraphQL](https://www.wpgraphql.com/) plugin installed and activated
  - [Recipe Card Blocks](https://recipecard.io/) plugin for recipe management
  - Categories configured: "recipes" and "blog"

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure WordPress Connection

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your WordPress GraphQL endpoint:

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-wordpress-site.com/graphql
```

### 3. WordPress Configuration

In your WordPress admin:

1. Install and activate **WPGraphQL** plugin
2. Install and activate **Recipe Card Blocks** plugin
3. Create categories: "recipe" for recipes, "garlic-blog" and "ginger-blog" for blog posts
4. Add recipes using the Recipe Card Blocks editor and assign to "recipe" category
5. Add blog posts and assign them to either "garlic-blog" or "ginger-blog" category
6. Ensure CORS is configured to allow requests from your Next.js site

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.jsx           # Root layout with fonts
│   │   ├── page.jsx             # Home page (now uses components)
│   │   ├── page.module.css      # Home page styles
│   │   ├── globals.css          # Global styles
│   │   ├── blog/
│   │   │   ├── page.jsx         # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.jsx     # Individual blog post
│   │   └── recipes/
│   │       ├── page.jsx         # Recipe listing page
│   │       └── [slug]/
│   │           └── page.jsx     # Individual recipe page
│   ├── components/
│   │   ├── index.js             # Barrel exports for clean imports
│   │   │
│   │   # Layout Components
│   │   ├── Header.jsx           # Site header with navigation
│   │   ├── Header.module.css
│   │   ├── Footer.jsx           # Site footer
│   │   └── Footer.module.css
│   │   │
│   │   # Section Components
│   │   ├── Hero.jsx             # Hero section with CTA
│   │   ├── Hero.module.css
│   │   ├── Categories.jsx       # Food category grid
│   │   ├── Categories.module.css
│   │   ├── FeaturedRecipes.jsx  # Featured recipes section
│   │   ├── FeaturedRecipes.module.css
│   │   ├── RecipesSection.jsx   # Recipe grid with filters
│   │   ├── RecipesSection.module.css
│   │   ├── About.jsx            # About us section
│   │   ├── About.module.css
│   │   ├── Newsletter.jsx       # Newsletter subscription
│   │   └── Newsletter.module.css
│   │   │
│   │   # Card Components
│   │   ├── RecipeCard.jsx       # Individual recipe card
│   │   ├── RecipeCard.module.css
│   │   ├── BlogCard.jsx         # Individual blog post card
│   │   └── BlogCard.module.css
│   │   │
│   │   # Grid Components
│   │   ├── RecipeGrid.jsx       # Recipe grid layout
│   │   ├── RecipeGrid.module.css
│   │   ├── BlogGrid.jsx         # Blog grid layout
│   │   └── BlogGrid.module.css
│   │   │
│   │   # UI Components
│   │   ├── Modal.jsx            # Reusable modal component
│   │   ├── Modal.module.css
│   │   ├── SideBySideView.jsx   # Side-by-side recipe view
│   │   └── SideBySideView.module.css
│   │
│   └── lib/
│       └── wordpress.js         # WordPress GraphQL API client
│
├── .env.local.example           # Environment variables template
└── README.md
```

## Component Architecture

The site follows a modular component architecture with:

- **Layout Components**: Header and Footer used across all pages
- **Section Components**: Reusable page sections (Hero, Categories, etc.)
- **Card Components**: Display individual items (recipes, blog posts)
- **Grid Components**: Organize cards in responsive layouts
- **UI Components**: General-purpose UI elements (Modal, etc.)

All components use CSS Modules for scoped, maintainable styling.

## Component Usage

### Importing Components

Components can be imported individually or through the barrel export:

```javascript
// Individual imports
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Barrel import (recommended)
import { Header, Footer, Hero, Categories } from '@/components';
```

### Component Props

Components are designed to be flexible with customizable props:

```javascript
// Hero component with custom content
<Hero 
  imageSrc="/custom-hero.jpg"
  title="YOUR CUSTOM TITLE"
  subtitle="Your custom subtitle text"
  buttonText="CLICK ME"
  buttonHref="/custom-page"
/>

// Categories with custom items
<Categories 
  categories={[
    { icon: '🍕', label: 'PIZZA' },
    { icon: '🍜', label: 'NOODLES' }
  ]}
  title="OUR MENU"
/>
```

## Development Best Practices

This project follows React and Next.js best practices:

- ✅ **Component Reusability**: All UI elements are broken into reusable components
- ✅ **Separation of Concerns**: Each component has its own scoped CSS module
- ✅ **DRY Principle**: No duplicate code - Header/Footer used across all pages
- ✅ **Server Components**: Using Next.js 15+ App Router with async server components
- ✅ **Client Components**: Marked with 'use client' only where interactivity is needed
- ✅ **Modular Architecture**: Easy to add, remove, or modify sections
- ✅ **Type Safety Ready**: Clean component structure makes TypeScript migration straightforward

## WordPress GraphQL Queries

The site fetches data using these queries:

- **Featured Recipes**: Posts in "recipe" category (limited to 6 for homepage)
- **All Recipes**: All posts in "recipe" category
- **Blog Posts**: Posts in "garlic-blog" and "ginger-blog" categories

## Customization

### Fonts

The site uses:
- **Annie Use Your Telescope** for the logo (loaded from Google Fonts)
- **Inter** for body text

To change fonts, edit [src/app/layout.jsx](src/app/layout.jsx).

### Colors & Styling

The site uses CSS Modules for styling. The color scheme includes:
- Orange (`#FF7A5C`, `#FFB48A`) for primary elements
- Gray (`#1F2937`, `#6B7280`) for text and backgrounds
- Beige (`#F5F2ED`) for page backgrounds

To customize colors, edit the respective `.module.css` files for each component. CSS variables can be added to [src/app/globals.css](src/app/globals.css) for global color management.

### WordPress Categories

The site expects these category slugs:
- `recipe` - for recipe posts
- `garlic-blog` and `ginger-blog` - for blog posts

Update the GraphQL queries in [src/lib/wordpress.js](src/lib/wordpress.js) if you use different category names.

## Troubleshooting

### No recipes or blog posts showing

1. Verify your `.env.local` file has the correct WordPress URL
2. Check that WPGraphQL is installed and activated in WordPress
3. Ensure posts are assigned to the correct categories
4. Check the browser console and terminal for error messages

### Build errors

If you get fetch errors during build, the site will still build successfully but show placeholder messages. This is normal if WordPress is not configured yet.

### CORS issues

Add this to your WordPress `functions.php` or use a CORS plugin:

```php
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
});
```

## License

MIT

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [WPGraphQL Documentation](https://www.wpgraphql.com/docs/introduction)
- [Recipe Card Blocks](https://recipecard.io/)
