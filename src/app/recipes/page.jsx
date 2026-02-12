import Link from 'next/link';
import { RecipeGrid, Header, Footer } from '@/components';
import { getAllRecipes } from '@/lib/wordpress';

export default async function RecipesPage() {
  let recipes = [];
  
  try {
    recipes = await getAllRecipes();
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Content */}
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">All Recipes</h1>
        
        {recipes.length > 0 ? (
          <RecipeGrid recipes={recipes} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border">
            <p className="text-gray-600 mb-4">
              No recipes available yet. Check back soon!
            </p>
            <Link
              href="/"
              className="text-gray-900 hover:text-gray-600 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
