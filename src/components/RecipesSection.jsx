'use client';

import { useState } from 'react';
import RecipeGrid from './RecipeGrid';
import styles from './RecipesSection.module.css';

const filterOptions = [
  'ALL',
  'NOODLES',
  'SOUPS',
  'SPICE BLENDS',
  'SNACKS',
  'DESSERT',
  'DRINKS',
];

export default function RecipesSection({ 
  recipes = [],
  badge = 'RECIPES',
  title = 'GLOBAL FLAVORS, BOLD HEAT',
  description = 'From Korean kimchi to Trinidad curry, Indian butter chicken to Mexican salsa—explore recipes that celebrate garlic and ginger across world cuisines.',
  showFilters = true
}) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredRecipes = activeFilter === 'ALL' 
    ? recipes 
    : recipes.filter(recipe => {
        // Add your filtering logic here based on recipe categories
        // This is a placeholder - adjust based on your data structure
        return recipe.categories?.some(cat => cat.name === activeFilter);
      });

  return (
    <section className={styles.recipeSection}>
      <div className={styles.recipeSectionHeader}>
        <span className={styles.recipeBadge}>{badge}</span>
        <h2 className={styles.recipeTitle}>{title}</h2>
        <p className={styles.recipeDescription}>{description}</p>
      </div>
      
      {showFilters && (
        <div className={styles.filterButtons}>
          {filterOptions.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? styles.filterBtnActive : styles.filterBtn}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {recipes && recipes.length > 0 ? (
        <RecipeGrid recipes={filteredRecipes} />
      ) : (
        <div className={styles.emptyState}>
          <p>No recipes available at the moment.</p>
        </div>
      )}
    </section>
  );
}
