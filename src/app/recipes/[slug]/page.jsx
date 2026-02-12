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

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const recipe = await getRecipeBySlug(slug);
    
    if (!recipe) {
      return {
        title: 'Recipe Not Found',
      };
    }

    const imageUrl = recipe.featuredImage?.node?.sourceUrl || 'https://garlicandginger.ca/og-image.jpg';

    return {
      title: recipe.title,
      description: recipe.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || `Discover how to make ${recipe.title} with bold flavors of garlic and ginger.`,
      keywords: ['recipe', 'garlic', 'ginger', 'spicy', recipe.title, 'cooking'],
      openGraph: {
        title: recipe.title,
        description: recipe.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || `Discover how to make ${recipe.title}`,
        type: 'article',
        url: `https://garlicandginger.ca/recipes/${slug}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: recipe.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: recipe.title,
        description: recipe.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || `Discover how to make ${recipe.title}`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    return {
      title: 'Recipe Not Found',
    };
  }
}

// Helper function to parse Recipe Cards plugin HTML
function parseRecipeCardHTML(content) {
  const data = {
    servings: null,
    prepTime: null,
    cookTime: null,
    totalTime: null
  };

  // Parse servings
  const servingsMatch = content.match(/<span class="detail-item-label">Servings<\/span><p class="detail-item-value">(\d+)<\/p>/i);
  if (servingsMatch) {
    data.servings = `${servingsMatch[1]} servings`;
  }

  // Parse prep time
  const prepTimeMatch = content.match(/<span class="detail-item-label">Prep time<\/span><p class="detail-item-value">(\d+)<\/p><span class="detail-item-unit">(.*?)<\/span>(?:<p class="detail-item-value">(\d+)<\/p><span class="detail-item-unit">(.*?)<\/span>)?/is);
  if (prepTimeMatch) {
    const value1 = prepTimeMatch[1];
    const unit1 = prepTimeMatch[2].replace('&nbsp;', '').trim();
    const value2 = prepTimeMatch[3];
    const unit2 = prepTimeMatch[4] ? prepTimeMatch[4].trim() : '';
    
    if (value2) {
      data.prepTime = `${value1} ${unit1} ${value2} ${unit2}`;
    } else {
      data.prepTime = `${value1} ${unit1}`;
    }
  }

  // Parse cooking time
  const cookTimeMatch = content.match(/<span class="detail-item-label">Cooking time<\/span><p class="detail-item-value">(\d+)<\/p><span class="detail-item-unit">(.*?)<\/span>(?:<p class="detail-item-value">(\d+)<\/p><span class="detail-item-unit">(.*?)<\/span>)?/is);
  if (cookTimeMatch) {
    const value1 = cookTimeMatch[1];
    const unit1 = cookTimeMatch[2].replace('&nbsp;', '').trim();
    const value2 = cookTimeMatch[3];
    const unit2 = cookTimeMatch[4] ? cookTimeMatch[4].trim() : '';
    
    if (value2) {
      data.cookTime = `${value1} ${unit1} ${value2} ${unit2}`;
    } else {
      data.cookTime = `${value1} ${unit1}`;
    }
  }

  return data;
}

// Helper function to clean Recipe Cards HTML from content
function cleanRecipeCardHTML(content) {
  // Remove the Recipe Cards metadata/details section
  let cleaned = content.replace(/<div class="details-items">[\s\S]*?<\/div>\s*<\/div>/i, '');
  
  // Remove Recipe Cards title if it duplicates the main title
  cleaned = cleaned.replace(/<h2 class="recipe-card-title">[\s\S]*?<\/h2>/i, '');
  
  // Remove ingredients section since we're displaying it separately
  cleaned = cleaned.replace(/<h[23][^>]*>Ingredients<\/h[23]>[\s\S]*?(?=<h[23][^>]*>|$)/i, '');
  
  return cleaned;
}

// Helper function to extract ingredients from content
function extractIngredients(content) {
  const ingredients = [];
  
  // Look for ingredients section - common patterns in WordPress Recipe Cards
  const ingredientsMatch = content.match(/<h[23][^>]*>Ingredients<\/h[23]>([\s\S]*?)(?=<h[23]|$)/i);
  
  if (ingredientsMatch) {
    const ingredientsSection = ingredientsMatch[1];
    
    // Extract list items
    const listItemMatches = ingredientsSection.matchAll(/<li[^>]*>(.*?)<\/li>/gi);
    
    for (const match of listItemMatches) {
      const ingredient = match[1].replace(/<[^>]*>/g, '').trim();
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
  }
  
  return ingredients;
}


export default async function RecipePage({ params }) {
  const { slug } = await params;
  
  let recipe;
  let similarRecipes = [];
  
  try {
    recipe = await getRecipeBySlug(slug);
    console.log('Recipe fetched:', recipe ? recipe.title : 'null');
    console.log('Recipe data:', JSON.stringify(recipe, null, 2));
    
    const allRecipes = await getAllRecipes();
    // Get similar recipes (exclude current recipe)
    similarRecipes = allRecipes.filter(r => r.slug !== slug).slice(0, 3);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    console.error('Error details:', error.message);
    notFound();
  }

  if (!recipe) {
    console.error('Recipe not found for slug:', slug);
    notFound();
  }

  // Extract ingredients from content if available
  const ingredients = extractIngredients(recipe.content);

  const formattedDate = new Date(recipe.date).toISOString();

  // Parse Recipe Cards plugin HTML from content
  const parsedRecipeData = parseRecipeCardHTML(recipe.content);
  
  // Get recipe metadata from parsed HTML or use defaults
  const prepTime = parsedRecipeData.prepTime || "20 minutes";
  const cookTime = parsedRecipeData.cookTime || "1 hour";
  const totalTime = parsedRecipeData.totalTime || "1 hour 20 minutes";
  const servings = parsedRecipeData.servings || "4-6 servings";
  const calories = "450"; // Default for now since not in HTML
  
  // Use extracted ingredients
  let recipeIngredients = ingredients;
  
  // Optional add-ons - use defaults for now
  let optionalAddOns = ["Fresh herbs for garnish", "Lemon wedges", "Extra chili flakes for more heat"];
  
  // Nutrition data - use defaults for now
  const nutrition = {
    calories: "450 kcal",
    protein: "35g",
    carbs: "25g",
    fat: "20g"
  };

  // Recipe Schema for SEO
  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title,
    "image": recipe.featuredImage?.node?.sourceUrl ? [recipe.featuredImage.node.sourceUrl] : [],
    "author": {
      "@type": "Organization",
      "name": "Garlic and Ginger"
    },
    "datePublished": formattedDate,
    "description": recipe.excerpt?.replace(/<[^>]*>/g, '') || `Delicious ${recipe.title} recipe featuring garlic and ginger`,
    "prepTime": `PT${prepTime.replace(/[^0-9]/g, '')}M`,
    "cookTime": `PT${cookTime.replace(/[^0-9]/g, '')}M`,
    "totalTime": `PT${totalTime.replace(/[^0-9]/g, '')}M`,
    "recipeYield": servings,
    "recipeCategory": "Main Course",
    "recipeCuisine": "International",
    "keywords": "garlic, ginger, spicy, recipe",
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": nutrition.calories,
      "proteinContent": nutrition.protein,
      "carbohydrateContent": nutrition.carbs,
      "fatContent": nutrition.fat
    },
    "recipeIngredient": recipeIngredients.length > 0 ? recipeIngredients : [
      "Fresh garlic",
      "Fresh ginger",
      "Chili peppers",
      "Various spices and ingredients"
    ],
    "recipeInstructions": recipe.content.replace(/<[^>]*>/g, ' ').substring(0, 500) + "...",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127"
    }
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      
      <Header />

      <RecipeHero
        title={recipe.title}
        excerpt={recipe.excerpt}
        category="RECIPE"
        prepTime={prepTime.toUpperCase()}
        calories={calories}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <RecipeContent 
              content={cleanRecipeCardHTML(recipe.content)} 
              ingredients={recipeIngredients}
            />
            
            <RecipeSidebar
              prepTime={prepTime}
              cookTime={cookTime}
              totalTime={totalTime}
              servings={servings}
              optionalAddOns={optionalAddOns}
              nutrition={nutrition}
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
