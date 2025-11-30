const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    difficulty: { type: Number, required: true, min: 1, max: 5 },
    taste: { type: Number, required: true, min: 0, max: 5 },
    ingredients: [{ type: String }],
    image: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

