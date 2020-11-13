const express = require('express'),
    cron = require('cron').CronJob,
    bodyParser = require('body-parser');

const app = express(),
    route = require('./src/routes'),
    scrap = require('./src/scraping');

global.bdd = require('./src/models');

/**
 * Seconds
 * Minutes
 * Hours
 * Months
 * Day of Week
 */
new cron('0 * * */30 * *', () => {
    scrap.allRecipes();
    console.log('run tache cron');
}).start();

const port = process.env.PORT || 8020; // Port ecoute du server
const www = process.env.WWW || './public'; // Point racine pour le dossier public

// Middelware
app.use(express.static(www)); // Emplacement du dossier public dans express
app.use(bodyParser.urlencoded({ extended: false }));

app.use(route);

// Route par defautl - Importante
app.get('*', (req, res) => {
    // Verif user
    res.sendFile(`index.html`, { root: www });
});


// Run serve
app.listen(port, () => console.log(`listening on http://localhost:${port}`));