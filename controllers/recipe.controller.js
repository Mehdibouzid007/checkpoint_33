const Recipe = require('../models/Recipe');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        // Debug: log first recipe to verify image URLs
        if (recipes.length > 0) {
            console.log('First recipe:', recipes[0].title, 'Image:', recipes[0].image);
        }
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Get all recipes error:', error);
        res.status(500).json({ errors: [{ msg: "Could not fetch recipes" }] });
    }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            return res.status(404).json({ errors: [{ msg: "Recipe not found" }] });
        }
        
        res.status(200).json(recipe);
    } catch (error) {
        console.error('Get recipe by ID error:', error);
        res.status(500).json({ errors: [{ msg: "Could not fetch recipe" }] });
    }
};

