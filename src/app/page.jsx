import {
  Header,
  Footer,
  Hero,
  Categories,
  FeaturedRecipes,
  RecipesSection,
  About,
  Newsletter
} from '@/components';
import { getFeaturedRecipes } from '@/lib/wordpress';
import styles from './page.module.css';

export const metadata = {
  title: 'Garlic and Ginger - Bold, Spicy Recipes from Around the World',
  description: 'Discover bold, spicy recipes featuring garlic and ginger. From fiery noodles and comforting soups to zesty spice blends and savory snacks. Spice up your cooking!',
  keywords: ['garlic recipes', 'ginger recipes', 'spicy food', 'hot recipes', 'chili recipes', 'bold flavors', 'spice blends', 'international cuisine'],
  openGraph: {
    title: 'Garlic and Ginger - Bold, Spicy Recipes',
    description: 'Discover bold, spicy recipes featuring garlic and ginger from cuisines around the world.',
    url: 'https://garlicandginger.ca',
    type: 'website',
  },
};

export default async function Home() {
  // Fetch featured recipes
  let featuredRecipes = [];
  try {
    featuredRecipes = await getFeaturedRecipes(6);
  } catch (error) {
    console.error('Error fetching featured recipes:', error);
    featuredRecipes = [];
  }

  return (
    <div className={styles.container}>
      <Header />
      <Hero />
      <Categories />
      <FeaturedRecipes recipes={featuredRecipes.slice(0, 3)} />
      <RecipesSection recipes={featuredRecipes} />
      <About />
      <Newsletter />
      <Footer />
    </div>
  );
}
