import React from 'react';
import { Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div style={styles.heroContainer}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>El Benna</h1>
        <p style={styles.subtitle}>La saveur authentique de la cuisine algérienne</p>
      </div>
    </div>
  );
};

const styles = {
  heroContainer: {
    position: 'relative',
    height: '70vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    backgroundImage: 'url("https://images.unsplash.com/photo-1541696432-82c6da8ce733?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(5px)',
  },
  title: {
    fontFamily: "'Amiri', serif",
    fontSize: '4.5rem',
    fontWeight: '700',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
  },
  subtitle: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.5rem',
    marginBottom: '30px',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
  },
  button: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: '600',
    fontSize: '1.2rem',
    padding: '12px 30px',
    borderRadius: '8px',
    backgroundColor: '#ffa500',
    borderColor: '#ffa500',
    transition: 'all 0.3s ease',
  },
};

export default Hero;