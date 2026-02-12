'use client';

import { useState } from 'react';
import Modal from './Modal';
import styles from './SideBySideView.module.css';

export default function SideBySideView({ recipeName, content }) {
  const [isOpen, setIsOpen] = useState(false);

  // Parse recipe content to extract ingredients and instructions
  const parseRecipeContent = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Try to find ingredients and instructions sections
    let ingredients = '';
    let instructions = '';

    // Look for common recipe card block patterns
    const ingredientSection = doc.querySelector('.wp-block-recipe-card-ingredients, [class*="ingredients"], h2:has-text("Ingredients"), h3:has-text("Ingredients")');
    const instructionSection = doc.querySelector('.wp-block-recipe-card-instructions, [class*="instructions"], h2:has-text("Instructions"), h3:has-text("Instructions"), h2:has-text("Directions"), h3:has-text("Directions")');

    if (ingredientSection) {
      let ingredientContainer = ingredientSection.nextElementSibling;
      while (ingredientContainer && !ingredientContainer.tagName.match(/^H[1-6]$/)) {
        ingredients += ingredientContainer.outerHTML;
        ingredientContainer = ingredientContainer.nextElementSibling;
      }
    }

    if (instructionSection) {
      let instructionContainer = instructionSection.nextElementSibling;
      while (instructionContainer && !instructionContainer.tagName.match(/^H[1-6]$/)) {
        instructions += instructionContainer.outerHTML;
        instructionContainer = instructionContainer.nextElementSibling;
      }
    }

    // Fallback: try to extract any lists
    if (!ingredients) {
      const lists = doc.querySelectorAll('ul, ol');
      if (lists.length > 0) {
        ingredients = lists[0].outerHTML;
        if (lists.length > 1) {
          instructions = lists[1].outerHTML;
        }
      }
    }

    return { ingredients, instructions };
  };

  const { ingredients, instructions } = parseRecipeContent(content);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.viewButton}
      >
        <svg className={styles.viewButtonIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        Side-by-Side View
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={recipeName} size="xl">
        <div className={styles.columnsGrid}>
          {/* Ingredients Column */}
          <div className={styles.ingredientsColumn}>
            <div className={styles.columnHeader}>
              <svg className={styles.columnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className={styles.columnTitle}>Ingredients</h3>
            </div>
            <div 
              className={styles.columnContent}
              dangerouslySetInnerHTML={{ __html: ingredients || '<p class="' + styles.emptyState + '">No ingredients found</p>' }}
            />
          </div>

          {/* Instructions Column */}
          <div className={styles.instructionsColumn}>
            <div className={styles.columnHeader}>
              <svg className={styles.columnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className={styles.columnTitle}>Instructions</h3>
            </div>
            <div 
              className={styles.columnContent}
              dangerouslySetInnerHTML={{ __html: instructions || '<p class="' + styles.emptyState + '">No instructions found</p>' }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}
