import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../Receipe/RecipeCard";
import Hero from "../components/Hero";

const Home = () => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState(null); // null, 'difficulty', or 'taste'
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        console.log('Fetched recipes:', data);
        console.log('First recipe image:', data[0]?.image);
        setRecipeData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleCardClick = (recipe) => {
    navigate(`/recipe/${recipe._id || recipe.id}`);
  };

  const sortedRecipes = useMemo(() => {
    let sorted = [...recipeData];
    if (sortType === 'difficulty') {
      sorted.sort((a, b) => a.difficulty - b.difficulty);
    } else if (sortType === 'taste') {
      sorted.sort((a, b) => b.taste - a.taste);
    }
    return sorted;
  }, [sortType, recipeData]);

  return (
    <div style={styles.pageContainer}>
      <Hero />
      
      <div style={styles.aboutSection}>
        <h2 style={styles.sectionTitle}>Bienvenue chez El Benna</h2>
        <p style={styles.aboutText}>
          Plongez au cœur de la gastronomie algérienne et découvrez des recettes authentiques transmises de génération en génération. Chez El Benna, nous célébrons la richesse des saveurs, la chaleur du partage et la beauté de notre héritage culinaire. Laissez-vous guider et inspirez-vous pour créer des plats qui racontent une histoire.
        </p>
      </div>

      <div style={styles.recipesSection}>
        <h2 style={styles.sectionTitle}>Nos recettes vedettes</h2>
        
        {loading && <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#a0410f' }}>Chargement des recettes...</p>}
        {error && <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#f44336' }}>Erreur: {error}</p>}
        
        {!loading && !error && (
          <>
            <div style={styles.sortContainer}>
              <button style={styles.sortButton} onClick={() => setSortType('difficulty')}>Trier par difficulté</button>
              <button style={styles.sortButton} onClick={() => setSortType('taste')}>Trier par goût</button>
              <button style={styles.sortButton} onClick={() => setSortType(null)}>Réinitialiser</button>
            </div>

            <div style={styles.cardGrid}>
              {sortedRecipes.map((recipe) => (
                <RecipeCard key={recipe._id || recipe.id} recipe={recipe} onClick={handleCardClick} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#fdf9f2',
    color: '#333',
  },
  aboutSection: {
    padding: '4rem 2rem',
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontFamily: "'Amiri', serif",
    fontSize: '2.5rem',
    color: '#a0410f',
    marginBottom: '1.5rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  aboutText: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
  },
  recipesSection: {
    padding: '4rem 2rem',
    backgroundColor: '#fff',
  },
  sortContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  sortButton: {
    backgroundColor: '#a0410f',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
};

export default Home;
