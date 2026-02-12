import RecipeCard from './RecipeCard';
import styles from './RecipeGrid.module.css';

export default function RecipeGrid({ recipes }) {
  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
