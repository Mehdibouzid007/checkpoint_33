// RecipeDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import recipes from "./recipesData";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r.id === parseInt(id));
  const { isAuth, user } = useSelector((state) => state.authReducer);
  
  // États pour les commentaires et votes
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [userVote, setUserVote] = useState(null); // null, 'like', ou 'dislike'
  const [voteCounts, setVoteCounts] = useState({ likes: 0, dislikes: 0 });

  // Charger les commentaires et votes depuis localStorage au montage
  useEffect(() => {
    const recipeId = id;
    const savedComments = localStorage.getItem(`recipe_${recipeId}_comments`);
    const savedVotes = localStorage.getItem(`recipe_${recipeId}_votes`);
    const userVoteKey = `recipe_${recipeId}_user_${user?.id || user?._id || user?.name || 'anonymous'}_vote`;
    const savedUserVote = localStorage.getItem(userVoteKey);

    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
    if (savedVotes) {
      setVoteCounts(JSON.parse(savedVotes));
    }
    if (savedUserVote && isAuth) {
      setUserVote(savedUserVote);
    }
  }, [id, isAuth, user]);

  // Gérer l'ajout de commentaire
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !isAuth) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      author: user.name || user.username || "Utilisateur",
      date: new Date().toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`recipe_${id}_comments`, JSON.stringify(updatedComments));
    setCommentText("");
  };

  // Gérer le vote (pouce vert ou rouge)
  const handleVote = (voteType) => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const recipeId = id;
    const userVoteKey = `recipe_${recipeId}_user_${user?.id || user?._id || user?.name || 'anonymous'}_vote`;
    const currentVote = localStorage.getItem(userVoteKey);

    let newVoteCounts = { ...voteCounts };

    // Si l'utilisateur avait déjà voté
    if (currentVote) {
      if (currentVote === voteType) {
        // Annuler le vote si on clique sur le même bouton
        if (voteType === 'like') {
          newVoteCounts.likes = Math.max(0, newVoteCounts.likes - 1);
        } else {
          newVoteCounts.dislikes = Math.max(0, newVoteCounts.dislikes - 1);
        }
        localStorage.removeItem(userVoteKey);
        setUserVote(null);
      } else {
        // Changer de vote
        if (currentVote === 'like') {
          newVoteCounts.likes = Math.max(0, newVoteCounts.likes - 1);
          newVoteCounts.dislikes += 1;
        } else {
          newVoteCounts.dislikes = Math.max(0, newVoteCounts.dislikes - 1);
          newVoteCounts.likes += 1;
        }
        localStorage.setItem(userVoteKey, voteType);
        setUserVote(voteType);
      }
    } else {
      // Nouveau vote
      if (voteType === 'like') {
        newVoteCounts.likes += 1;
      } else {
        newVoteCounts.dislikes += 1;
      }
      localStorage.setItem(userVoteKey, voteType);
      setUserVote(voteType);
    }

    setVoteCounts(newVoteCounts);
    localStorage.setItem(`recipe_${recipeId}_votes`, JSON.stringify(newVoteCounts));
  };

  if (!recipe) {
    return (
      <div style={{ padding: "30px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f1e1", minHeight: "100vh", textAlign: "center" }}>
        <p style={{ fontSize: "1.5rem", color: "#a0410f" }}>Recette introuvable</p>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#a0410f",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f1e1", minHeight: "100vh" }}>
      <div
        className="recipe-details"
        style={{
          marginTop: "40px",
          background: "#fff3e6",
          padding: "30px 35px",
          borderRadius: "18px",
          border: "3px solid #a0410f",
          color: "#5c482b",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 8px 20px rgba(160, 65, 15, 0.3)"
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#a0410f",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "25px",
            transition: "background-color 0.3s ease",
            boxShadow: "0 3px 10px rgba(160, 65, 15, 0.7)"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#732d00")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#a0410f")}
        >
          Retour
        </button>

        <h2
          style={{
            fontFamily: "'Amiri', serif",
            color: "#a0410f",
            marginBottom: "20px",
            fontSize: "2.4rem",
            textShadow: "1px 1px 3px rgba(160, 65, 15, 0.5)"
          }}
        >
          {recipe.title}
        </h2>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: "100%",
            maxHeight: "320px",
            objectFit: "cover",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: "0 6px 15px rgba(160, 65, 15, 0.4)"
          }}
        />
        <p style={{ fontSize: "1.15rem", lineHeight: "1.6", color: "#5c482b", marginBottom: "25px" }}>
          {recipe.description}
        </p>

        <h3 style={{ fontFamily: "'Amiri', serif", fontSize: "1.8rem", color: "#a0410f", marginBottom: "15px" }}>Ingrédients</h3>
        <ul style={{ marginTop: "10px", paddingLeft: "30px", fontSize: "1.1rem", color: "#5c482b" }}>
          {recipe.ingredients.map((ing, i) => (
            <li key={i} style={{ marginBottom: "7px" }}>
              {ing}
            </li>
          ))}
        </ul>

        <h3 style={{ fontFamily: "'Amiri', serif", fontSize: "1.8rem", color: "#a0410f", marginTop: "40px", marginBottom: "20px" }}>Vidéo tutoriel</h3>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "15px", boxShadow: "0 6px 18px rgba(160, 65, 15, 0.35)" }}>
          <iframe
            src={recipe.video}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Video tutoriel pour ${recipe.title}`}
          />
        </div>

        {/* Section Votes */}
        {isAuth && (
          <div style={{ marginTop: "40px", paddingTop: "30px", borderTop: "2px solid #a0410f" }}>
            <h3 style={{ fontFamily: "'Amiri', serif", fontSize: "1.8rem", color: "#a0410f", marginBottom: "20px" }}>
              Avez-vous aimé cette recette ?
            </h3>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <button
                onClick={() => handleVote("like")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  backgroundColor: userVote === "like" ? "#4caf50" : "#fff",
                  color: userVote === "like" ? "#fff" : "#4caf50",
                  border: `2px solid #4caf50`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  boxShadow: userVote === "like" ? "0 4px 12px rgba(76, 175, 80, 0.4)" : "none"
                }}
                onMouseOver={(e) => {
                  if (userVote !== "like") {
                    e.target.style.backgroundColor = "#e8f5e9";
                  }
                }}
                onMouseOut={(e) => {
                  if (userVote !== "like") {
                    e.target.style.backgroundColor = "#fff";
                  }
                }}
              >
                <i className="fa-solid fa-heart"></i>
                <span>J'aime ({voteCounts.likes})</span>
              </button>
              <button
                onClick={() => handleVote("dislike")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  backgroundColor: userVote === "dislike" ? "#f44336" : "#fff",
                  color: userVote === "dislike" ? "#fff" : "#f44336",
                  border: `2px solid #f44336`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                  boxShadow: userVote === "dislike" ? "0 4px 12px rgba(244, 67, 54, 0.4)" : "none"
                }}
                onMouseOver={(e) => {
                  if (userVote !== "dislike") {
                    e.target.style.backgroundColor = "#ffebee";
                  }
                }}
                onMouseOut={(e) => {
                  if (userVote !== "dislike") {
                    e.target.style.backgroundColor = "#fff";
                  }
                }}
              >
                <i className="fa-solid fa-heart-crack"></i>
                <span>Je n'aime pas ({voteCounts.dislikes})</span>
              </button>
            </div>
          </div>
        )}

        {/* Section Commentaires */}
        <div style={{ marginTop: "40px", paddingTop: "30px", borderTop: "2px solid #a0410f" }}>
          <h3 style={{ fontFamily: "'Amiri', serif", fontSize: "1.8rem", color: "#a0410f", marginBottom: "20px" }}>
            Commentaires ({comments.length})
          </h3>

          {/* Formulaire de commentaire (uniquement pour utilisateurs connectés) */}
          {isAuth ? (
            <form onSubmit={handleAddComment} style={{ marginBottom: "30px" }}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Laissez un commentaire sur cette recette..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "15px",
                  borderRadius: "10px",
                  border: "2px solid #a0410f",
                  fontSize: "1rem",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  resize: "vertical",
                  marginBottom: "15px"
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#a0410f",
                  color: "white",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#732d00")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#a0410f")}
                disabled={!commentText.trim()}
              >
                Publier le commentaire
              </button>
            </form>
          ) : (
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff3e6",
                borderRadius: "10px",
                border: "2px dashed #a0410f",
                textAlign: "center",
                marginBottom: "30px"
              }}
            >
              <p style={{ color: "#734b26", marginBottom: "15px" }}>
                Vous devez être connecté pour laisser un commentaire.
              </p>
              <button
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: "#a0410f",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
              >
                Se connecter
              </button>
            </div>
          )}

          {/* Liste des commentaires */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {comments.length === 0 ? (
              <p style={{ color: "#734b26", fontStyle: "italic", textAlign: "center", padding: "20px" }}>
                Aucun commentaire pour le moment. Soyez le premier à commenter !
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    backgroundColor: "#fff8f0",
                    padding: "20px",
                    borderRadius: "10px",
                    border: "1px solid #a0410f",
                    boxShadow: "0 2px 8px rgba(160, 65, 15, 0.1)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <strong style={{ color: "#a0410f", fontSize: "1.1rem" }}>{comment.author}</strong>
                    <span style={{ color: "#734b26", fontSize: "0.9rem" }}>{comment.date}</span>
                  </div>
                  <p style={{ color: "#5c482b", lineHeight: "1.6", margin: 0 }}>{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
            