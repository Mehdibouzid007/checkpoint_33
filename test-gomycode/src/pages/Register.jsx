import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { register as registerAction } from "../JS/actions/AuthAction";
import store from "../JS/store/store";

function Register() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [showMsg, setShowMsg] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    store.dispatch(registerAction(newUser, navigate));
    // navigate('/profile');
  };

  return (
    <div style={{ padding: "30px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f1e1", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ width: "25rem", boxShadow: "0 8px 20px rgba(160, 65, 15, 0.3)", border: "3px solid #a0410f", borderRadius: "18px", background: "#fff3e6" }}>
        <Card.Body style={{ padding: "30px" }}>
          <h2 style={{ fontFamily: "'Amiri', serif", color: "#a0410f", textAlign: "center", marginBottom: "30px", fontSize: "2.4rem", textShadow: "1px 1px 3px rgba(160, 65, 15, 0.5)" }}>Inscription</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="registerUsername">
              <Form.Label style={{ color: "#734b26", fontWeight: "600", marginBottom: "8px" }}>Nom d'utilisateur</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Votre nom" 
                name="name" 
                value={newUser.name} 
                onChange={handleChange} 
                required 
                style={{ 
                  borderRadius: "10px", 
                  border: "2px solid #a0410f", 
                  padding: "12px",
                  fontSize: "1rem",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label style={{ color: "#734b26", fontWeight: "600", marginBottom: "8px" }}>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Votre email" 
                name="email" 
                value={newUser.email} 
                onChange={handleChange} 
                required 
                style={{ 
                  borderRadius: "10px", 
                  border: "2px solid #a0410f", 
                  padding: "12px",
                  fontSize: "1rem",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label style={{ color: "#734b26", fontWeight: "600", marginBottom: "8px" }}>Mot de passe</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Mot de passe" 
                name="password" 
                value={newUser.password} 
                onChange={handleChange} 
                required 
                style={{ 
                  borderRadius: "10px", 
                  border: "2px solid #a0410f", 
                  padding: "12px",
                  fontSize: "1rem",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                }}
              />
            </Form.Group>
            <p style={{ fontSize: "0.9rem", color: "#734b26", textAlign: "center", marginBottom: "20px" }}>
              Vous n'etes pas nouveau ici? <a href="/login" style={{ color: "#a0410f", textDecoration: "none", fontWeight: "600" }}>Connectez-vous</a>
            </p>
            <Button 
              type="submit" 
              className="w-100" 
              style={{ 
                borderRadius: "10px", 
                fontWeight: "600", 
                backgroundColor: "#a0410f",
                border: "none",
                padding: "12px",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
                boxShadow: "0 3px 10px rgba(160, 65, 15, 0.7)"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#732d00")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#a0410f")}
            >
              S'inscrire
            </Button>
          </Form>
          {showMsg && <div className="mt-3 text-center" style={{ color: "#a0410f", fontWeight: "600" }}>Inscription réussie (fake)</div>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;

