import styles from './RecipeHero.module.css';

export default function RecipeHero({ 
  title,
  excerpt,
  category = "RECIPE",
  prepTime,
  calories
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>{category}</span>
        <h1 className={styles.title}>{title}</h1>
        {excerpt && (
          <div 
            className={styles.excerpt}
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}
        
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
