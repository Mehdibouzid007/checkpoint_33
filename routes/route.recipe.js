const express = require('express');
const { getAllRecipes, getRecipeById } = require('../controllers/recipe.controller');
const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

module.exports = router;

