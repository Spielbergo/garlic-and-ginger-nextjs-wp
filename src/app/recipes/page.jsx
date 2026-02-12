import { Header, Footer, RecipesSection, Newsletter } from '@/components';
import { getAllRecipes } from '@/lib/wordpress';
import styles from './recipes.module.css';

export const metadata = {
  title: 'All Recipes - Browse Our Complete Collection',
  description: 'Explore our complete collection of bold, spicy recipes featuring garlic and ginger. From noodles and soups to spice blends and snacks. Filter by category to find your perfect dish.',
  keywords: ['recipes', 'garlic recipes', 'ginger recipes', 'spicy recipes', 'noodle recipes', 'soup recipes', 'spice blends', 'snack recipes'],
  openGraph: {
    title: 'All Recipes - Garlic and Ginger',
    description: 'Explore our complete collection of bold, spicy recipes featuring garlic and ginger from cuisines around the world.',
    url: 'https://garlicandginger.ca/recipes',
    type: 'website',
  },
};

export default async function RecipesPage() {
  let recipes = [];
  
  try {
    recipes = await getAllRecipes();
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>RECIPES</span>
          <h1 className={styles.title}>COOK WITH PASSION. EAT WITH JOY.</h1>
          <p className={styles.subtitle}>
            Explore our ever-growing collection of bold, flavorful recipes where garlic and ginger take center stage. From comforting noodles to fiery spice blends, there's something for every craving.
          </p>
        </div>
      </section>

      <RecipesSection 
        recipes={recipes} 
        showFilters={true}
        badge="EXPLORE"
        title="ALL OUR RECIPES"
        description="Filter by category to find your next culinary adventure."
      />
      
      <Newsletter />
      <Footer />
    </div>
  );
}
