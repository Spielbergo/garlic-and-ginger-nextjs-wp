import Image from 'next/image';
import styles from './RecipeHero.module.css';

export default function RecipeHero({ 
  title,
  subtitle = "Welcome to Garlic & Ginger, where culinary dreams come alive. Today, we embark on a journey of creating a perfect harmony of garlic and ginger in every dish.",
  image,
  imageAlt,
  category = "FOOD",
  prepTime,
  calories
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
        <p className={styles.subtitle}>{subtitle}</p>
        
        <div className={styles.metaBadges}>
          <button className={styles.metaBadge}>
            <span className={styles.metaIcon}>🍽️</span>
            {category}
          </button>
          {prepTime && (
            <button className={styles.metaBadge}>
              <span className={styles.metaIcon}>⏱️</span>
              {prepTime} PREP
            </button>
          )}
          {calories && (
            <button className={styles.metaBadge}>
              <span className={styles.metaIcon}>🔥</span>
              {calories} CALORIES
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
