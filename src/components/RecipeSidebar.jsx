'use client';

import styles from './RecipeSidebar.module.css';

export default function RecipeSidebar({ 
  prepTime = "20 minutes",
  cookTime = "1 hour",
  totalTime = "1 hour 20 minutes",
  servings = "4-6 servings",
  optionalAddOns = [],
  nutrition = {}
}) {

  return (
    <aside className={styles.sidebar}>
      {/* Preparation Details */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>PREPARATION DETAILS</h3>
        <div className={styles.detailsList}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Prep Time:</span>
            <span className={styles.detailValue}>{prepTime}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Cook Time:</span>
            <span className={styles.detailValue}>{cookTime}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Total Time:</span>
            <span className={styles.detailValue}>{totalTime}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Serving Size:</span>
            <span className={styles.detailValue}>{servings}</span>
          </div>
        </div>
      </section>

      {/* Optional Add-Ons */}
      {optionalAddOns.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>OPTIONAL ADD-ONS</h3>
          <ul className={styles.addOnsList}>
            {optionalAddOns.map((addOn, index) => (
              <li key={index} className={styles.addOnItem}>• {addOn}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Nutrition Facts */}
      {Object.keys(nutrition).length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>NUTRITION FACTS</h3>
          <div className={styles.nutritionList}>
            {nutrition.calories && (
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Calories:</span>
                <span className={styles.nutritionValue}>{nutrition.calories}</span>
              </div>
            )}
            {nutrition.protein && (
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Protein:</span>
                <span className={styles.nutritionValue}>{nutrition.protein}</span>
              </div>
            )}
            {nutrition.carbs && (
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Carbohydrates:</span>
                <span className={styles.nutritionValue}>{nutrition.carbs}</span>
              </div>
            )}
            {nutrition.fat && (
              <div className={styles.nutritionItem}>
                <span className={styles.nutritionLabel}>Fat:</span>
                <span className={styles.nutritionValue}>{nutrition.fat}</span>
              </div>
            )}
          </div>
        </section>
      )}
    </aside>
  );
}
