import Image from 'next/image';
import styles from './BlogHero.module.css';

export default function BlogHero({ 
  title,
  excerpt,
  image,
  imageAlt,
  category = "BLOG",
  date,
  author = "The Garlic & Ginger Team"
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroImage}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className={styles.image}
            priority
          />
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>🌶️</span>
          </div>
        )}
      </div>
      
      <div className={styles.heroContent}>
        <span className={styles.badge}>{category}</span>
        <h1 className={styles.title}>{title}</h1>
        {excerpt && (
          <div 
            className={styles.excerpt}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}
        
        <div className={styles.metaInfo}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📅</span>
            {date}
          </span>
          <span className={styles.metaDivider}>•</span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>✍️</span>
            {author}
          </span>
        </div>
      </div>
    </section>
  );
}
