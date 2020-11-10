const ingredients = require('express').Router();


ingredients.get('/ingredients', (req, res) => {
    console.log('All ingredients')
    res.end('Fin')
})

ingredients.get('/equipement', (req, res) => {
    console.log('All equipement ', req.params.type);
    // Cas de figur. url = /all/:type?filter=apero
    if (req.param('apero') !== undefined)
        console.log('Add filter ', req.param('apero'))
    res.end('Fin')
})

module.exports = ingredients;