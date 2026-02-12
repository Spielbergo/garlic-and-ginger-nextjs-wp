import Link from 'next/link';
import Image from 'next/image';
import styles from './RelatedPosts.module.css';

export default function RelatedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>RELATED ARTICLES</h2>
        
        <div className={styles.grid}>
          {posts.slice(0, 3).map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {post.featuredImage?.node?.sourceUrl ? (
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText || post.title}
                    fill
                    className={styles.image}
                  />
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderIcon}>🌶️</span>
                  </div>
                )}
              </div>
              
              <div className={styles.content}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                {post.excerpt && (
                  <div 
                    className={styles.excerpt}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                )}
                <button className={styles.readButton}>READ MORE</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
