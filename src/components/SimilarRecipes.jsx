import Link from 'next/link';
import Image from 'next/image';
import styles from './SimilarRecipes.module.css';

export default function SimilarRecipes({ recipes = [] }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>SIMILAR RECIPES</h2>
        
        <div className={styles.grid}>
          {recipes.slice(0, 3).map((recipe) => (
            <Link 
              key={recipe.id} 
              href={`/recipes/${recipe.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {recipe.featuredImage?.node?.sourceUrl ? (
                  <Image
                    src={recipe.featuredImage.node.sourceUrl}
                    alt={recipe.featuredImage.node.altText || recipe.title}
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
                <h3 className={styles.recipeTitle}>{recipe.title}</h3>
                {recipe.excerpt && (
                  <div 
                    className={styles.excerpt}
                    dangerouslySetInnerHTML={{ __html: recipe.excerpt }}
                  />
                )}
                <button className={styles.viewButton}>VIEW RECIPE</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
