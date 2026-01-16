# Garlic and Ginger - Recipe Site

A Next.js recipe website that uses WordPress as a headless CMS with the Recipe Card Blocks plugin.

## Features

- 🍳 Recipe listing and detail pages
- 📝 Blog section
- 🎨 Custom "Annie Use Your Telescope" font for branding
- 🚀 Built with Next.js 16, TypeScript, and Tailwind CSS
- 📱 Responsive design
- ⚡ Server-side rendering with WordPress integration

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
3. Create two categories: "recipes" and "blog"
4. Add recipes using the Recipe Card Blocks editor
5. Add blog posts and assign them to the "blog" category
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
│   │   ├── layout.tsx       # Root layout with fonts
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── RecipeCard.tsx   # Individual recipe card
│   │   ├── RecipeGrid.tsx   # Recipe grid layout
│   │   ├── BlogCard.tsx     # Individual blog post card
│   │   └── BlogGrid.tsx     # Blog grid layout
│   ├── lib/
│   │   └── wordpress.ts     # WordPress API client
│   └── types/
│       └── recipe.ts        # TypeScript interfaces
├── .env.local.example       # Environment variables template
└── README.md
```

## WordPress GraphQL Queries

The site fetches data using these queries:

- **Featured Recipes**: Posts in "recipes" category (limited to 6 for homepage)
- **All Recipes**: All posts in "recipes" category
- **Blog Posts**: Posts in "blog" category

## Customization

### Fonts

The site uses:
- **Annie Use Your Telescope** for the logo (loaded from Google Fonts)
- **Inter** for body text

To change fonts, edit [src/app/layout.tsx](src/app/layout.tsx).

### Colors

The color scheme uses:
- Green (`green-600`, `green-700`) for primary elements
- Amber (`amber-50`, `amber-500`) for accents
- White and gray for backgrounds

Colors can be customized in the Tailwind classes throughout the components.

### WordPress Categories

The site expects these category slugs:
- `recipes` - for recipe posts
- `blog` - for blog posts

Update the GraphQL queries in [src/lib/wordpress.ts](src/lib/wordpress.ts) if you use different category names.

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
