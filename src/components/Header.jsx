'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/recipes', label: 'RECIPES' },
    { href: '/blog', label: 'BLOG' },
    { href: '/about-us', label: 'ABOUT US' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Track scroll to add border/shadow when user scrolls
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsScrolled(y > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
        <Link href="/" className={styles.logoText} style={{ fontFamily: 'var(--font-annie)' }}>
          Garlic and Ginger
        </Link>
      </div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={pathname === item.href ? styles.navLinkActive : styles.navLink}
          >
            {item.label}
          </Link>
        ))}
      </nav>

        {/* Desktop Subscribe Button */}
        <button className={styles.subscribeBtn}>SUBSCRIBE</button>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className={styles.hamburgerIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <div className={styles.mobileMenuLogo} style={{ fontFamily: 'var(--font-annie)' }}>
            Garlic and Ginger
          </div>
          <button 
            className={styles.closeBtn}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className={styles.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={pathname === item.href ? styles.mobileNavLinkActive : styles.mobileNavLink}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button className={styles.mobileSubscribeBtn}>SUBSCRIBE</button>
        </div>
      </div>
      </header>
  );
}
