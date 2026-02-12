import { notFound } from 'next/navigation';
import { 
  Header, 
  Footer, 
  BlogHero, 
  RecipeContent, 
  RelatedPosts, 
  Newsletter 
} from '@/components';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/wordpress';
import styles from './blogPost.module.css';

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

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const imageUrl = post.featuredImage?.node?.sourceUrl || 'https://garlicandginger.ca/og-image.jpg';

    return {
      title: post.title,
      description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || `Read about ${post.title} on Garlic and Ginger blog.`,
      keywords: ['garlic', 'ginger', 'spicy food', 'cooking tips', 'blog', post.title],
      authors: [{ name: 'Garlic and Ginger Team' }],
      openGraph: {
        title: post.title,
        description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || `Read about ${post.title}`,
        type: 'article',
        url: `https://garlicandginger.ca/blog/${slug}`,
        publishedTime: post.date,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || `Read about ${post.title}`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  
  let post;
  let relatedPosts = [];
  
  try {
    post = await getBlogPostBySlug(slug);
    const allPosts = await getAllBlogPosts();
    // Get related posts (exclude current post)
    relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);
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

  const isoDate = new Date(post.date).toISOString();

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featuredImage?.node?.sourceUrl ? [post.featuredImage.node.sourceUrl] : [],
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": {
      "@type": "Organization",
      "name": "Garlic and Ginger",
      "url": "https://garlicandginger.ca"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Garlic and Ginger",
      "logo": {
        "@type": "ImageObject",
        "url": "https://garlicandginger.ca/favicon.svg"
      }
    },
    "description": post.excerpt?.replace(/<[^>]*>/g, '') || `Read about ${post.title} on Garlic and Ginger blog.`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://garlicandginger.ca/blog/${post.slug}`
    }
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <Header />

      <BlogHero
        title={post.title}
        excerpt={post.excerpt}
        image={post.featuredImage?.node?.sourceUrl}
        imageAlt={post.featuredImage?.node?.altText || post.title}
        category="BLOG"
        date={formattedDate}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <RecipeContent content={post.content} />
        </div>
      </main>

      <RelatedPosts posts={relatedPosts} />
      
      <Newsletter />
      
      <Footer />
    </div>
  );
}
