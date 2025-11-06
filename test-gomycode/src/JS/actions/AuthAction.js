import { FAIL_AUTH, SUCCESS_AUTH, LOAD_AUTH, CURRENT_AUTH, LOGOUT_AUTH } from '../actionTypes/AuthActionType';
import axios from 'axios';

// Fonction utilitaire pour extraire le message d'erreur le plus lisible
const extractErrorMsg = (error) => {
  if (!error) return "Erreur inconnue";
  if (typeof error === "string") return error;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data?.errors) return error.response.data.errors;
  if (error.message) return error.message;
  if (Array.isArray(error)) return error.map(e => e.message || e).join(", ");
  return "Erreur inconnue";
};

// Inscription avec redirection
export const register = (newUser, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_AUTH });
  try {
    const payload = {
      username: newUser.name,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };
    const result = await axios.post('/api/users/register', payload);
    dispatch({ type: SUCCESS_AUTH, payload: result.data });
    navigate('/profile');
  } catch (error) {
    const errorMsg = extractErrorMsg(error);
    dispatch({ type: FAIL_AUTH, payload: errorMsg });
    throw new Error(errorMsg);
  }
};

// Connexion avec redirection et gestion d'erreur
export const login = (user, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_AUTH });
  try {
    const result = await axios.post('/api/users/login', user);
    dispatch({ type: SUCCESS_AUTH, payload: result.data });
    navigate('/profile');
  } catch (error) {
    const errorMsg = extractErrorMsg(error);
    dispatch({ type: FAIL_AUTH, payload: errorMsg });
    throw new Error(errorMsg); // Permet au composant d'afficher l'erreur
  }
};

// Récupérer utilisateur courant
export const current = () => async (dispatch) => {
  dispatch({ type: LOAD_AUTH });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const result = await axios.get('/api/users/current', config);
    dispatch({ type: CURRENT_AUTH, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_AUTH, payload: extractErrorMsg(error) });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_AUTH });
};
