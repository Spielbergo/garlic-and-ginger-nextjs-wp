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
