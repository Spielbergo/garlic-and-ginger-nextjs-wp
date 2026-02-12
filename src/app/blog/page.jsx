import Link from 'next/link';
import { BlogGrid, Header, Footer } from '@/components';
import { getAllBlogPosts } from '@/lib/wordpress';

export default async function BlogPage() {
  let posts = [];
  
  try {
    posts = await getAllBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
        
        {posts.length > 0 ? (
          <BlogGrid posts={posts} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-600 mb-4">
              No blog posts available yet. Check back soon!
            </p>
            <Link
              href="/"
              className="text-gray-900 hover:text-gray-600 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
