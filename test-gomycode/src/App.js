import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Erreur from './pages/Erreur';
import BarreNav from './components/BarreNav';
import Footer from './components/Footer';
import RecipeDetails from './Receipe/RecipeDetails'; // Import nouvelle page détails recette
import { useEffect } from 'react';
import { current } from './JS/actions/AuthAction';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(current());
    }
  }, [dispatch]);

  return (
    <>
      <BarreNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} /> {/* Route détails recette */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Erreur />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
