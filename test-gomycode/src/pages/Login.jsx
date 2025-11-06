import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../JS/actions/AuthAction";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Fonction utilitaire côté composant pour afficher l'erreur la plus claire possible
  const getErrorMsg = (err) => {
    if (!err) return "";
    if (typeof err === "string") return err;
    if (err.message) return err.message;
    if (Array.isArray(err)) return err.map((e, i) => <div key={i}>{e.message || e}</div>);
    return "Identifiant ou mot de passe incorrect";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(login(user, navigate));
    } catch (err) {
      setError(getErrorMsg(err));
    }
  };

  return (
    <div style={{ padding: "30px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f1e1", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ maxWidth: "400px", width: "100%", padding: "30px 35px", backgroundColor: "#fff3e6", borderRadius: "18px", border: "3px solid #a0410f", boxShadow: "0 8px 20px rgba(160, 65, 15, 0.3)" }}>
        <h2 style={{ fontFamily: "'Amiri', serif", textAlign: "center", marginBottom: "30px", color: "#a0410f", fontSize: "2.4rem", textShadow: "1px 1px 3px rgba(160, 65, 15, 0.5)" }}>Connectez-vous</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ color: "#734b26", fontWeight: "600", marginBottom: "8px" }}>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Votre email"
            value={user.email}
            onChange={handleChange}
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #a0410f",
              fontSize: "1rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
            required
          />
          <label style={{ color: "#734b26", fontWeight: "600", marginBottom: "8px" }}>Mot de passe</label>
          <input
            name="password"
            type="password"
            placeholder="Votre mot de passe"
            value={user.password}
            onChange={handleChange}
            style={{
              marginBottom: "20px",
              padding: "12px",
              borderRadius: "10px",
              border: "2px solid #a0410f",
              fontSize: "1rem",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
            required
          />
          {error && (
            <div style={{
              color: "#d32f2f",
              marginBottom: "20px",
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#ffebee",
              borderRadius: "8px",
              border: "1px solid #d32f2f"
            }}>
              {error}
            </div>
          )}
          <button 
            type="submit" 
            style={{
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: "#a0410f",
              color: "white",
              border: "none",
              fontWeight: "600",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 3px 10px rgba(160, 65, 15, 0.7)"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#732d00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#a0410f")}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
