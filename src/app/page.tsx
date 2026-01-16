import Link from 'next/link';
import RecipeGrid from '@/components/RecipeGrid';
import BlogGrid from '@/components/BlogGrid';
import { getFeaturedRecipes, getAllBlogPosts } from '@/lib/wordpress';

export default async function Home() {
  // Fetch featured recipes and blog posts with error handling
  let featuredRecipes = [];
  let recentPosts = [];

  try {
    featuredRecipes = await getFeaturedRecipes(6);
    const blogPosts = await getAllBlogPosts();
    recentPosts = blogPosts.slice(0, 3);
  } catch (error) {
    console.error('Error fetching data from WordPress:', error);
    // Use empty arrays if WordPress is not configured yet
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-700 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-annie)' }}>
            Garlic and Ginger
          </h1>
          <p className="text-xl mb-8">
            Discover delicious recipes and cooking inspiration
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/recipes"
              className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-100 transition-colors"
            >
              Browse Recipes
            </Link>
            <Link
              href="/blog"
              className="bg-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-600 transition-colors"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800">Featured Recipes</h2>
          <Link
            href="/recipes"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            View All →
          </Link>
        </div>
        {featuredRecipes.length > 0 ? (
          <RecipeGrid recipes={featuredRecipes} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              No recipes available yet. Configure your WordPress connection in .env.local
            </p>
          </div>
        )}
      </section>

      {/* Latest Blog Posts Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Latest from the Blog</h2>
            <Link
              href="/blog"
              className="text-green-600 hover:text-green-700 font-semibold"
            >
              View All →
            </Link>
          </div>
          {recentPosts.length > 0 ? (
            <BlogGrid posts={recentPosts} />
          ) : (
            <div className="text-center py-12 bg-amber-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                No blog posts available yet. Configure your WordPress connection in .env.local
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-annie)' }}>
            Garlic and Ginger
          </h3>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Garlic and Ginger. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
