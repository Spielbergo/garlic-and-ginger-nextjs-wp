'use client';

import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter({
  badge = 'SUBSCRIBE',
  title = 'TURN UP THE HEAT\nSUBSCRIBE NOW!',
  description = 'Get weekly spicy recipes, garlic & ginger cooking tips, and exclusive flavor-packed content delivered straight to your inbox.'
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('Please enter your email address');
      return;
    }

    // Add your newsletter subscription logic here
    setStatus('Thank you for subscribing!');
    setEmail('');
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <section className={styles.newsletterSection}>
      <span className={styles.newsletterBadge}>{badge}</span>
      <h2 className={styles.newsletterTitle}>
        {title.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            {index < title.split('\n').length - 1 && <br />}
          </span>
        ))}
      </h2>
      <p className={styles.newsletterDescription}>{description}</p>
      <form className={styles.newsletterForm} onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email Address" 
          className={styles.newsletterInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email Address"
        />
        <button type="submit" className={styles.newsletterBtn}>
          SUBSCRIBE
        </button>
      </form>
      {status && (
        <p className={styles.statusMessage}>{status}</p>
      )}
    </section>
  );
}
