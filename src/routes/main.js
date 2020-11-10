const express = require('express'); // Chargement Express
const app = express(); // Instance Express
const route = require('./src/routes');


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