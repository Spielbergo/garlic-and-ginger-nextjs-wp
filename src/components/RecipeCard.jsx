import Image from 'next/image';
import Link from 'next/link';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ recipe }) {
  // Debug: Log the recipe data to console
  if (typeof window !== 'undefined') {
    console.log('Recipe data:', {
      title: recipe.title,
      hasImage: !!recipe.featuredImage,
      imageUrl: recipe.featuredImage?.node?.sourceUrl,
      fullImageData: recipe.featuredImage
    });
  }

  return (
    <Link href={`/recipes/${recipe.slug}`} className={styles.cardLink}>
      <div className={styles.card}>
        {recipe.featuredImage?.node?.sourceUrl ? (
          <div className={styles.imageWrapper}>
            <Image
              src={recipe.featuredImage.node.sourceUrl}
              alt={recipe.featuredImage.node.altText || recipe.title}
              fill
              className={styles.image}
              onError={(e) => {
                console.error('Image failed to load:', recipe.featuredImage.node.sourceUrl);
                e.target.style.display = 'none';
              }}
            />
          </div>
        ) : (
          <div className={styles.imageWrapper}>
            <div className={styles.placeholderImage}>
              <span className={styles.placeholderIcon}>🌶️</span>
            </div>
          </div>
        )}
        <div className={styles.content}>
          <h3 className={styles.title}>
            {recipe.title}
          </h3>
          {recipe.excerpt && (
            <div 
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: recipe.excerpt }}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
