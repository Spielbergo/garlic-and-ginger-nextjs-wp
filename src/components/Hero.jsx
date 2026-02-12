import styles from './Hero.module.css';

export default function Hero({ 
  imageSrc = 'images/hero.webp',
  title = 'SPICE UP YOUR LIFE',
  subtitle = 'Discover bold, flavorful recipes featuring the dynamic duo of garlic and ginger. From fiery curries to zesty stir-fries, explore global cuisines that pack a punch.',
  buttonText = 'EXPLORE RECIPES',
  buttonHref = '/recipes'
}) {
  return (
    <section className={styles.heroSection}>
      <img src={imageSrc} alt="Hero image" className={styles.heroImage} />
      <div className={styles.heroOverlay}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
        <a href={buttonHref} className={styles.heroBtn}>
          {buttonText}
        </a>
      </div>
    </section>
  );
}
