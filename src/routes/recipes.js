const recipes = require('express').Router();


recipes.get('/all', (req, res) => {
    console.log('All recipes')
    res.end('Fin')
})

recipes.get('/all/:type', (req, res) => {
    console.log('All recipes ', req.params.type);
    // Cas de figur. url = localhost:port/recipes/all/:type?apero=filtre
    if (req.param('apero') !== undefined)
        console.log('Add filter ', req.param('apero'))
    res.end('Fin')
})

module.exports = recipes;