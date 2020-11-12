const recipes = require('./recipes'),
    routes = require('express').Router(),
    ingredients = require('./ingredients');


routes.use('/recipes', recipes);
routes.use('/ingredients', ingredients);

module.exports = routes;