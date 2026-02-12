import { notFound } from 'next/navigation';
import { 
  Header, 
  Footer, 
  RecipeHero, 
  RecipeContent, 
  RecipeSidebar, 
  SimilarRecipes,
  Newsletter 
} from '@/components';
import { getRecipeBySlug, getAllRecipes } from '@/lib/wordpress';
import styles from './recipe.module.css';

export async function generateStaticParams() {
  try {
    const recipes = await getAllRecipes();
    return recipes.map((recipe) => ({
      slug: recipe.slug,
    }));
  } catch (error) {
    return [];
  }
}

// Helper function to extract ingredients from content
function extractIngredients(content) {
  // Try to find ingredients list in the content
  const ingredientsMatch = content.match(/<h[23]>Ingredients<\/h[23]>(.*?)(?=<h[23]>|$)/is);
  if (ingredientsMatch) {
    const listMatch = ingredientsMatch[1].match(/<li>(.*?)<\/li>/g);
    if (listMatch) {
      return listMatch.map(item => item.replace(/<\/?li>/g, '').trim());
    }
  }
  return [];
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  
  let recipe;
  let similarRecipes = [];
  
  try {
    recipe = await getRecipeBySlug(slug);
    const allRecipes = await getAllRecipes();
    // Get similar recipes (exclude current recipe)
    similarRecipes = allRecipes.filter(r => r.slug !== slug).slice(0, 3);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    notFound();
  }

  if (!recipe) {
    notFound();
  }

  // Extract ingredients from content if available
  const ingredients = extractIngredients(recipe.content);

  return (
    <div className={styles.page}>
      <Header />

      <RecipeHero
        title={recipe.title}
        image={recipe.featuredImage?.node?.sourceUrl}
        imageAlt={recipe.featuredImage?.node?.altText || recipe.title}
        category="RECIPE"
        prepTime="20 MINS"
        calories="450"
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <RecipeContent content={recipe.content} />
            
            <RecipeSidebar
              prepTime="20 minutes"
              cookTime="1 hour"
              totalTime="1 hour 20 minutes"
              servings="4-6 servings"
              ingredients={ingredients}
              optionalAddOns={[
                "Fresh herbs for garnish",
                "Lemon wedges",
                "Extra chili flakes for more heat"
              ]}
              nutrition={{
                calories: "450 kcal",
                protein: "35g",
                carbs: "25g",
                fat: "20g"
              }}
            />
          </div>
        </div>
      </main>

      <SimilarRecipes recipes={similarRecipes} />
      
      <Newsletter />
      
      <Footer />
    </div>
  );
}
