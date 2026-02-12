import styles from './Categories.module.css';

const defaultCategories = [
  { icon: '🍜', label: 'NOODLES' },
  { icon: '🥣', label: 'SOUPS' },
  { icon: '🌶️', label: 'SPICE BLENDS' },
  { icon: '🥙', label: 'SNACKS' },
  { icon: '🍪', label: 'DESSERTS' },
  { icon: '🍵', label: 'DRINKS' },
];

export default function Categories({ 
  categories = defaultCategories,
  badge = 'EXPLORE',
  title = 'SPICE FOR EVERY OCCASION',
  description = 'From warming soups and zesty noodles to bold spice blends and savory snacks, discover recipes that bring the heat with garlic and ginger in every bite.'
}) {
  return (
    <section className={styles.paletteSection}>
      <div className={styles.paletteLeft}>
        <span className={styles.paletteBadge}>{badge}</span>
        <h2 className={styles.paletteTitle}>{title}</h2>
        <p className={styles.paletteDescription}>{description}</p>
        <button className={styles.paletteSeeMoreBtn}>See More</button>
      </div>
      <div className={styles.paletteRight}>
        <div className={styles.paletteGrid}>
          {categories.map((category, index) => (
            <div key={index} className={styles.paletteItem}>
              <span className={styles.paletteIcon}>{category.icon}</span>
              <span className={styles.paletteLabel}>{category.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
