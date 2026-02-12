'use client';

import { useState } from 'react';
import styles from './RecipeContent.module.css';

export default function RecipeContent({ content, ingredients = [] }) {
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Split content at Directions/Instructions heading
  const splitContent = () => {
    const directionsMatch = content.match(/(.*?)(<h[23][^>]*>(?:Directions|Instructions|DIRECTIONS|INSTRUCTIONS)<\/h[23]>.*)/is);
    
    if (directionsMatch) {
      return {
        beforeDirections: directionsMatch[1],
        fromDirections: directionsMatch[2]
      };
    }
    
    // If no directions heading found, put ingredients at the end
    return {
      beforeDirections: content,
      fromDirections: ''
    };
  };

  const { beforeDirections, fromDirections } = splitContent();

  return (
    <div className={styles.content}>
      {/* Content before directions */}
      {beforeDirections && (
        <div 
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: beforeDirections }}
        />
      )}
      
      {/* Ingredients section */}
      {ingredients.length > 0 && (
        <div className={styles.ingredientsSection}>
          <h2 className={styles.mainTitle}>INGREDIENTS</h2>
          <ul className={styles.ingredientsList}>
            {ingredients.map((ingredient, index) => (
              <li key={index} className={styles.ingredientItem}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={checkedIngredients[index] || false}
                    onChange={() => toggleIngredient(index)}
                    className={styles.checkbox}
                  />
                  <span className={checkedIngredients[index] ? styles.checkedText : ''}>
                    {ingredient}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Directions and rest of content */}
      {fromDirections && (
        <div 
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: fromDirections }}
        />
      )}
    </div>
  );
}
