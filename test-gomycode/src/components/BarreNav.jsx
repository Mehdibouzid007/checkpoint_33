import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../JS/actions/AuthAction';

const BarreNav = () => {
  const { isAuth } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Navbar 
      expand="lg" 
      variant="light" 
      sticky="top" 
      style={scrolled ? { ...styles.navbar, ...styles.scrolled } : styles.navbar}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={styles.brand}>
          El Benna
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" style={styles.toggle} />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto" navbarScroll>
            <Nav.Link as={NavLink} to="/" end style={styles.link} activeStyle={styles.activeLink}>
              Accueil
            </Nav.Link>
            {!isAuth ? (
              <>
                <Nav.Link as={NavLink} to="/register" style={styles.link} activeStyle={styles.activeLink}>
                  S'inscrire
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" style={styles.link} activeStyle={styles.activeLink}>
                  Se connecter
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/profile" style={styles.link} activeStyle={styles.activeLink}>
                  Profil
                </Nav.Link>
                <Nav.Link 
                  onClick={handleLogout} 
                  style={{ ...styles.link, cursor: 'pointer' }}
                >
                  Déconnexion
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'rgba(255, 243, 230, 0.85)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    padding: '1rem 0',
    transition: 'all 0.3s ease-in-out',
    borderBottom: '1px solid rgba(160, 65, 15, 0.1)'
  },
  scrolled: {
    backgroundColor: 'rgba(255, 243, 230, 0.95)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    padding: '0.75rem 0',
  },
  brand: {
    fontWeight: '700',
    fontSize: '1.9rem',
    color: '#a0410f',
    fontFamily: "'Amiri', serif",
    textDecoration: 'none',
  },
  toggle: {
    borderColor: 'rgba(160, 65, 15, 0.5)',
    borderRadius: '5px',
  },
  link: {
    color: '#734b26',
    fontWeight: '500',
    fontSize: '1.05rem',
    marginRight: '1.2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textDecoration: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
  },
  activeLink: {
    color: '#a0410f',
    fontWeight: '600',
    backgroundColor: 'rgba(160, 65, 15, 0.08)',
  },
};

export default BarreNav;
