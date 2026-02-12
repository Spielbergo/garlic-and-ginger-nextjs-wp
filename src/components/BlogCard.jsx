import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';

export default function BlogCard({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
      <article className={styles.card}>
        {post.featuredImage?.node.sourceUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.content}>
          <time className={styles.date}>{formattedDate}</time>
          <h3 className={styles.title}>
            {post.title}
          </h3>
          {post.excerpt && (
            <div 
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}
        </div>
      </article>
    </Link>
  );
}
