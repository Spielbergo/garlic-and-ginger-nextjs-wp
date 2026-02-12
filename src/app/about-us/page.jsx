import { Header, Footer, Newsletter } from '@/components';
import Image from 'next/image';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us - Our Story & Mission',
  description: 'Learn about our passion for spicy, flavorful cooking with garlic and ginger at the heart of every recipe. Meet the team behind Garlic and Ginger.',
  keywords: ['about us', 'garlic and ginger team', 'cooking philosophy', 'spicy food', 'recipe development'],
  openGraph: {
    title: 'About Us - Garlic and Ginger',
    description: 'Learn about our passion for spicy, flavorful cooking with garlic and ginger at the heart of every recipe.',
    url: 'https://garlicandginger.ca/about-us',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>ABOUT US</span>
          <h1 className={styles.title}>PASSIONATE ABOUT SPICE, FLAVOR & TRADITION</h1>
          <p className={styles.subtitle}>
            Welcome to Garlic and Ginger, where we believe every dish deserves a kick of flavor. 
            Our journey began with a simple love for the bold, aromatic combination of garlic and ginger—two ingredients that have been at the heart of cuisines around the world for centuries.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.container}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <div className={styles.imagePlaceholder}>
                <span className={styles.imageIcon}>🌶️</span>
              </div>
            </div>
            <div className={styles.storyContent}>
              <h2 className={styles.sectionTitle}>OUR STORY</h2>
              <p className={styles.text}>
                It all started in a small kitchen where experiments with garlic and ginger turned into a passion for creating recipes that warm the soul and ignite the palate. We discovered that these two humble ingredients could transform any dish from ordinary to extraordinary.
              </p>
              <p className={styles.text}>
                From fiery stir-fries to comforting soups, zesty marinades to bold spice blends, we've dedicated ourselves to exploring every delicious possibility. Our recipes celebrate the versatility of garlic and ginger while embracing the heat that makes food truly memorable.
              </p>
              <p className={styles.text}>
                Today, we're thrilled to share our culinary adventures with a community of food lovers who aren't afraid to turn up the heat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCentered}>WHAT WE BELIEVE</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🔥</span>
              <h3 className={styles.valueTitle}>BOLD FLAVORS</h3>
              <p className={styles.valueText}>
                We believe food should excite your taste buds. Every recipe is crafted to deliver maximum flavor with the perfect balance of spice and aromatics.
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🌿</span>
              <h3 className={styles.valueTitle}>FRESH INGREDIENTS</h3>
              <p className={styles.valueText}>
                Quality starts with the basics. We emphasize using fresh garlic, ginger, and the finest ingredients to ensure every dish tastes incredible.
              </p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>📖</span>
              <h3 className={styles.valueTitle}>SIMPLE TECHNIQUES</h3>
              <p className={styles.valueText}>
                Great cooking doesn't have to be complicated. Our recipes are designed to be accessible while delivering restaurant-quality results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCentered}>MEET THE TEAM</h2>
          <p className={styles.teamIntro}>
            Behind every recipe is a team of passionate food enthusiasts who live and breathe the art of spicy cooking.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <span className={styles.teamIcon}>👨‍🍳</span>
              </div>
              <h3 className={styles.teamName}>Head Chef & Founder</h3>
              <p className={styles.teamRole}>Recipe Developer</p>
              <p className={styles.teamBio}>
                With over 15 years of experience in Asian and fusion cuisine, our founder brings authentic flavors and modern techniques together.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <span className={styles.teamIcon}>👩‍🍳</span>
              </div>
              <h3 className={styles.teamName}>Test Kitchen Manager</h3>
              <p className={styles.teamRole}>Quality Control</p>
              <p className={styles.teamBio}>
                Ensures every recipe is tested, perfected, and accessible for home cooks of all skill levels.
              </p>
            </div>
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <span className={styles.teamIcon}>📸</span>
              </div>
              <h3 className={styles.teamName}>Food Photographer</h3>
              <p className={styles.teamRole}>Visual Storyteller</p>
              <p className={styles.teamBio}>
                Captures the beauty and deliciousness of each dish, making you hungry just by looking at the photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>JOIN OUR SPICY COMMUNITY</h2>
          <p className={styles.ctaText}>
            Be part of a growing community of food lovers who appreciate the bold flavors of garlic, ginger, and spice. Get new recipes, cooking tips, and exclusive content delivered to your inbox.
          </p>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
