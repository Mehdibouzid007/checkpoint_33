import React from "react";
import { useNavigate } from "react-router-dom";

const Erreur = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "30px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f1e1", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", maxWidth: "600px", padding: "40px", backgroundColor: "#fff3e6", borderRadius: "18px", border: "3px solid #a0410f", boxShadow: "0 8px 20px rgba(160, 65, 15, 0.3)" }}>
        <h1 style={{ fontFamily: "'Amiri', serif", color: "#a0410f", fontSize: "3rem", marginBottom: "20px", textShadow: "1px 1px 3px rgba(160, 65, 15, 0.5)" }}>
          Oups, page introuvable !
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#5c482b", marginBottom: "30px", lineHeight: "1.6" }}>
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#a0410f",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            boxShadow: "0 3px 10px rgba(160, 65, 15, 0.7)"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#732d00")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#a0410f")}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default Erreur;
