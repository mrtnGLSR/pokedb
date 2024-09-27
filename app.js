// modules
const express = require('express');
const { engine } = require('express-handlebars');

//lancement de l'application
const app = express();

// configure engine
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './views');
// définition des pages

// page principale
app.get('/', (req, res) => {
    res.render('home');
});

// lancement du serveur
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});