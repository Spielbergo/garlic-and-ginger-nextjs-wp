import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedRecipes.module.css';

export default function FeaturedRecipes({ recipes = [], title = 'SPICE HIGHLIGHTS' }) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <section className={styles.featuredSection}>
      <h2 className={styles.featuredTitle}>{title}</h2>
      <div className={styles.featuredCards}>
        {recipes.map((recipe) => (
          <div key={recipe.id || recipe.slug} className={styles.featuredCard}>
            {recipe.featuredImage?.node?.sourceUrl ? (
              <div className={styles.featuredCardImageWrapper}>
                <Image
                  src={recipe.featuredImage.node.sourceUrl}
                  alt={recipe.featuredImage.node.altText || recipe.title}
                  fill
                  className={styles.featuredCardImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className={styles.featuredCardImageWrapper}>
                <div className={styles.placeholderImage}>
                  <span className={styles.placeholderIcon}>🌶️</span>
                </div>
              </div>
            )}
            <h3 className={styles.featuredCardTitle}>{recipe.title}</h3>
            {recipe.excerpt && (
              <div 
                className={styles.featuredCardDescription}
                dangerouslySetInnerHTML={{ __html: recipe.excerpt }}
              />
            )}
            {recipe.meta && (
              <div className={styles.featuredCardMeta}>
                <span>{recipe.meta}</span>
              </div>
            )}
            <Link href={`/recipes/${recipe.slug}`} className={styles.viewRecipeBtn}>
              VIEW RECIPE
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
