const express = require('express'); // Chargement Express
const app = express(); // Instance Express
global.bdd = require('./src/models');
const route = require('./src/routes');



/**
 * Zone de test
 *

const Recipes = require('./src/models/recipesModel');
let newRecipe = new Recipes();
newRecipe.title = 'Bob';
newRecipe.preparationTime = 30;
newRecipe.numberPeople = 3;
newRecipe.step = [
    'Couper du fromage',
    'Couper du fromage',
    'Couper du fromage'
];
newRecipe.ingredients = [{
    name: 'Banane',
    quantity: 2,
    gramming: 'g',
}]
newRecipe.zoubida = 8

newRecipe.save()
*/

const scrap = require('./src/scraping');

scrap.allRecipes();

/**
 * End Zone de test
 */



const port = process.env.PORT || 8020; // Port ecoute du server
const www = process.env.WWW || './public'; // Point racine pour le dossier public

// Middelware
app.use(express.static(www)); // Emplacement du dossier public dans express

app.use(route);

// Route par defautl - Importante
app.get('*', (req, res) => {
    // Verif user
    res.sendFile(`index.html`, { root: www });
});


// Run serve
app.listen(port, () => console.log(`listening on http://localhost:${port}`));