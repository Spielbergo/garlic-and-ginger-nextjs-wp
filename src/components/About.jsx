import Link from 'next/link';
import styles from './About.module.css';

const defaultImages = [
  { src: '/about-us-1.webp', alt: 'Grilled meat' },
  { src: '/about-us-2.webp', alt: 'Garlic' },
  { src: '/about-us-3.webp', alt: 'Ginger' },
];

export default function About({
  badge = 'ABOUT US',
  title = 'GARLIC & GINGER',
  description = 'We believe the best recipes start with two powerful ingredients: garlic and ginger. Our mission is to share bold, spicy dishes from around the world that showcase these aromatic powerhouses in every bite.',
  buttonText = 'READ MORE',
  buttonHref = '/about-us',
  images = defaultImages
}) {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutLeft}>
        <span className={styles.aboutBadge}>{badge}</span>
        <h2 className={styles.aboutTitle}>{title}</h2>
        <p className={styles.aboutDescription}>{description}</p>
        <Link href={buttonHref} className={styles.readMoreBtn}>
          {buttonText}
        </Link>
      </div>
      <div className={styles.aboutRight}>
        {images.map((image, index) => (
          <img 
            key={index}
            src={image.src} 
            alt={image.alt} 
            className={styles.aboutImage} 
          />
        ))}
      </div>
    </section>
  );
}
