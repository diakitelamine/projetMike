const recipes = require('express').Router();
const controller = require('../controllers/recipes');


recipes.get('/all', controller.allRecipes)

recipes.get('/all/:type', controller.allRecipesByType)

module.exports = recipes;