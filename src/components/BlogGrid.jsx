import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

export default function BlogGrid({ posts }) {
  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
