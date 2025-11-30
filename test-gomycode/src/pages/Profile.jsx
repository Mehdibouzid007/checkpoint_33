import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("https://t3.ftcdn.net/jpg/09/64/89/20/360_F_964892089_vioRltmAxaoQEBLtYtChVBxIzDWwhA3T.jpg");
  const [userComments, setUserComments] = useState([]);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes');
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  // Charger la photo de profil depuis localStorage
  useEffect(() => {
    const savedProfilePic = localStorage.getItem(`user_${user?.id || user?._id || user?.name || 'anonymous'}_profile_picture`);
    if (savedProfilePic) {
      setProfilePicture(savedProfilePic);
    }
  }, [user]);

  // Charger tous les commentaires de l'utilisateur
  useEffect(() => {
    if (recipes.length === 0) return;

    const userName = user?.name || user?.username || "Utilisateur";
    const allComments = [];

    // Parcourir toutes les recettes pour trouver les commentaires
    recipes.forEach((recipe) => {
      const recipeId = recipe._id || recipe.id;
      const savedComments = localStorage.getItem(`recipe_${recipeId}_comments`);
      if (savedComments) {
        try {
          const comments = JSON.parse(savedComments);
          comments.forEach((comment) => {
            if (comment.author === userName) {
              allComments.push({
                ...comment,
                recipeId: recipeId,
                recipeTitle: recipe.title
              });
            }
          });
        } catch (e) {
          console.error("Error parsing comments:", e);
        }
      }
    });

    // Trier par date (plus récent en premier)
    allComments.sort((a, b) => b.id - a.id);
    setUserComments(allComments);
  }, [user, recipes]);

  // Gérer le changement de photo de profil
  const handleProfilePictureChange = () => {
    if (imageUrl.trim()) {
      const userKey = `user_${user?.id || user?._id || user?.name || 'anonymous'}_profile_picture`;
      localStorage.setItem(userKey, imageUrl);
      setProfilePicture(imageUrl);
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  // Gérer le changement via input file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const userKey = `user_${user?.id || user?._id || user?.name || 'anonymous'}_profile_picture`;
        localStorage.setItem(userKey, reader.result);
        setProfilePicture(reader.result);
        setShowImageInput(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: "30px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f7f1e1", minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "40px auto", padding: "30px 35px", backgroundColor: "#fff3e6", borderRadius: "18px", border: "3px solid #a0410f", boxShadow: "0 8px 20px rgba(160, 65, 15, 0.3)" }}>
        <h2 style={{ fontFamily: "'Amiri', serif", color: "#a0410f", marginBottom: "30px", fontSize: "2.4rem", textShadow: "1px 1px 3px rgba(160, 65, 15, 0.5)", textAlign: "center" }}>
          Profil utilisateur {user.name}
        </h2>

        {/* Section Photo de profil */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px", paddingBottom: "30px", borderBottom: "2px solid #a0410f" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={profilePicture}
              alt="Profil"
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid #a0410f",
                boxShadow: "0 6px 15px rgba(160, 65, 15, 0.4)"
              }}
            />
          </div>
          {!showImageInput ? (
            <button
              onClick={() => setShowImageInput(true)}
              style={{
                marginTop: "20px",
                backgroundColor: "#a0410f",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "0.95rem",
                transition: "background-color 0.3s ease"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#732d00")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#a0410f")}
            >
              Changer la photo de profil
            </button>
          ) : (
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "400px" }}>
              <input
                type="text"
                placeholder="URL de l'image"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "2px solid #a0410f",
                  fontSize: "0.95rem"
                }}
              />
              <div style={{ textAlign: "center", color: "#734b26", margin: "10px 0" }}>ou</div>
              <label style={{ display: "block" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <div
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#fff8f0",
                    border: "2px dashed #a0410f",
                    borderRadius: "8px",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#734b26",
                    fontWeight: "600"
                  }}
                >
                  Choisir un fichier
                </div>
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                {imageUrl && (
                  <button
                    onClick={handleProfilePictureChange}
                    style={{
                      flex: 1,
                      backgroundColor: "#a0410f",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    Valider URL
                  </button>
                )}
                <button
                  onClick={() => {
                    setShowImageInput(false);
                    setImageUrl("");
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#734b26",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Section Commentaires */}
        <div>
          <h3 style={{ fontFamily: "'Amiri', serif", fontSize: "1.8rem", color: "#a0410f", marginBottom: "20px" }}>
            Mes commentaires ({userComments.length})
          </h3>
          {userComments.length === 0 ? (
            <p style={{ color: "#734b26", fontStyle: "italic", textAlign: "center", padding: "20px" }}>
              Vous n'avez pas encore laissé de commentaires.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {userComments.map((comment) => (
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
                    <div>
                      <strong style={{ color: "#a0410f", fontSize: "1.1rem", display: "block", marginBottom: "5px" }}>
                        {comment.recipeTitle}
                      </strong>
                      <span style={{ color: "#734b26", fontSize: "0.9rem" }}>{comment.date}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/recipe/${comment.recipeId}`)}
                      style={{
                        backgroundColor: "#a0410f",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "0.9rem"
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#732d00")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#a0410f")}
                    >
                      Voir la recette
                    </button>
                  </div>
                  <p style={{ color: "#5c482b", lineHeight: "1.6", margin: 0 }}>{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
