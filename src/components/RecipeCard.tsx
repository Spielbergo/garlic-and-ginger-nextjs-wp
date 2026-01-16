import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        {recipe.featuredImage?.node.sourceUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={recipe.featuredImage.node.sourceUrl}
              alt={recipe.featuredImage.node.altText || recipe.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors">
            {recipe.title}
          </h3>
          {recipe.excerpt && (
            <div 
              className="text-gray-600 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: recipe.excerpt }}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
