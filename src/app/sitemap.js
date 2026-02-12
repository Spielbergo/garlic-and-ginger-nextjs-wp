import { getAllRecipes, getAllBlogPosts } from '@/lib/wordpress';

export default async function sitemap() {
  const baseUrl = 'https://garlicandginger.ca';

  // Fetch all recipes and blog posts
  let recipes = [];
  let posts = [];

  try {
    recipes = await getAllRecipes();
  } catch (error) {
    console.error('Error fetching recipes for sitemap:', error);
  }

  try {
    posts = await getAllBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Recipe pages
  const recipePages = recipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`,
    lastModified: new Date(recipe.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Blog pages
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...recipePages, ...blogPages];
}
