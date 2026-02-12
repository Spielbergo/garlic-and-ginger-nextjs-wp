import { Header, Footer, BlogSection, Newsletter } from '@/components';
import { getAllBlogPosts } from '@/lib/wordpress';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog - Cooking Tips, Stories & Articles',
  description: 'Discover articles, cooking tips, and stories about garlic, ginger, and chillies. Learn new techniques and explore the world of spicy cuisine.',
  keywords: ['cooking blog', 'garlic tips', 'ginger recipes', 'spicy food blog', 'culinary articles', 'cooking techniques'],
  openGraph: {
    title: 'Blog - Garlic and Ginger',
    description: 'Discover articles, tips, and stories about cooking with garlic, ginger, and chillies.',
    url: 'https://garlicandginger.ca/blog',
    type: 'website',
  },
};

export default async function BlogPage() {
  let posts = [];
  
  try {
    posts = await getAllBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>BLOG</span>
          <h1 className={styles.title}>SPICE UP YOUR KNOWLEDGE</h1>
          <p className={styles.subtitle}>
            Explore our collection of articles, cooking tips, and stories celebrating the bold flavors of garlic, ginger, and chillies.
          </p>
        </div>
      </section>

      <BlogSection posts={posts} />
      
      <Newsletter />
      <Footer />
    </div>
  );
}
