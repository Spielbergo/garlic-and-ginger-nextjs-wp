'use client';

import { useState } from 'react';
import Modal from './Modal';
import styles from './RecipeContent.module.css';

export default function RecipeContent({ content, ingredients = [] }) {
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className={styles.ingredientsHeader}>
            <h2 className={styles.mainTitle}>INGREDIENTS</h2>
            <button 
              className={styles.popoutButton}
              onClick={() => setIsModalOpen(true)}
              aria-label="Open side-by-side view"
            >
              <svg className={styles.popoutIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              Side-by-Side View
            </button>
          </div>
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

      {/* Side-by-Side Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Recipe View"
        size="xl"
      >
        <div className={styles.modalLayout}>
          <div className={styles.modalColumn}>
            <h3 className={styles.modalSectionTitle}>Ingredients</h3>
            <ul className={styles.modalIngredientsList}>
              {ingredients.map((ingredient, index) => (
                <li key={index} className={styles.modalIngredient}>
                  <label className={styles.modalCheckboxLabel}>
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
          <div className={styles.modalColumn}>
            <h3 className={styles.modalSectionTitle}>Directions</h3>
            <div 
              className={styles.modalDirections}
              dangerouslySetInnerHTML={{ __html: fromDirections }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
