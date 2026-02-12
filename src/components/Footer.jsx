import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/recipes', label: 'RECIPES' },
    { href: '/cooking-tips', label: 'COOKING TIPS' },
    { href: '/about-us', label: 'ABOUT US' },
  ];

  const socialLinks = [
    { href: '#', icon: 'fab fa-tiktok', label: 'TikTok' },
    { href: '#', icon: 'fab fa-facebook', label: 'Facebook' },
    { href: '#', icon: 'fab fa-instagram', label: 'Instagram' },
    { href: '#', icon: 'fab fa-youtube', label: 'YouTube' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <span className={styles.footerLogoText}>Garlic and Ginger</span>
        </div>
        <nav className={styles.footerNav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.footerLink}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.footerSocial}>
          {socialLinks.map((social) => (
            <a 
              key={social.label} 
              href={social.href} 
              className={styles.footerSocialLink}
              aria-label={social.label}
            >
              <i className={social.icon}></i>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.footerCopyright}>
        Copyright © {currentYear} GARLIC AND GINGER.
      </div>
    </footer>
  );
}
