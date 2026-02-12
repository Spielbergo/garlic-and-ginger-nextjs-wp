import styles from './RecipeContent.module.css';

export default function RecipeContent({ content }) {
  return (
    <div className={styles.content}>
      <h2 className={styles.mainTitle}>INSTRUCTIONS</h2>
      <div 
        className={styles.prose}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
