import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.brandSection}>
            <div style={styles.brand}>
              El Benna
            </div>
            <p style={styles.tagline}>Saveurs authentiques d'Algérie</p>
          </div>
          
          <div style={styles.linksSection}>
            <h4 style={styles.sectionTitle}>Navigation</h4>
            <div style={styles.links}>
              <a href="/" style={styles.link}>Accueil</a>
              <a href="/register" style={styles.link}>S'inscrire</a>
              <a href="/login" style={styles.link}>Se connecter</a>
            </div>
          </div>
          
          <div style={styles.contactSection}>
            <h4 style={styles.sectionTitle}>Contact</h4>
            <div style={styles.contactInfo}>
              <span style={styles.contactItem}>📧 contact@elbenna.com</span>
              <span style={styles.contactItem}>📱 +213 X XX XX XX XX</span>
              <span style={styles.contactItem}>📍 Algérie</span>
            </div>
          </div>
        </div>
        
        <div style={styles.divider}></div>
        
        <div style={styles.bottom}>
          <p style={styles.copyright}>
            &copy; 2024 El Benna. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: 'linear-gradient(135deg, #2c1d0f 0%, #1a1208 100%)',
    color: '#fff3e6',
    padding: '3rem 0 1.5rem',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2.5rem',
    marginBottom: '2.5rem',
  },
  brandSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  brand: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#c58a54',
    fontFamily: "'Amiri', serif",
  },
  tagline: {
    fontSize: '0.95rem',
    color: '#a3a3a3',
    fontStyle: 'italic',
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  linksSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#c58a54',
    margin: '0 0 0.5rem 0',
    fontFamily: "'Amiri', serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  link: {
    color: '#e0e0e0',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s ease',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  contactSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  contactItem: {
    fontSize: '0.9rem',
    color: '#e0e0e0',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #c58a54, transparent)',
    opacity: '0.3',
    margin: '2.5rem 0 1.5rem',
  },
  bottom: {
    textAlign: 'center',
  },
  copyright: {
    fontSize: '0.85rem',
    color: '#a3a3a3',
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
};

export default Footer;
