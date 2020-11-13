const express = require('express'); // Chargement Express
const app = express(); // Instance Express
global.bdd = require('./src/models');
const route = require('./src/routes');
const cron = require('cron').CronJob;


const scrap = require('./src/scraping');
/**
 * Seconds
 * Minutes
 * Hours
 * Months
 * Day of Week
 */
new cron('0 * * */30 * *', function() {
    scrap.allRecipes();
    console.log('run tache cron');
}).start();

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