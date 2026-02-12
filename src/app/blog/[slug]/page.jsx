import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header, Footer } from '@/components';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/wordpress';

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  
  let post;
  try {
    post = await getBlogPostBySlug(slug);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Blog Post Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {post.featuredImage?.node.sourceUrl && (
            <div className="relative h-96 w-full">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-8">{formattedDate}</p>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>

        {/* Back Link */}
        <div className="max-w-4xl mx-auto mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-900 hover:text-gray-600 font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </article>
      
      <Footer />
    </div>
  );
}
