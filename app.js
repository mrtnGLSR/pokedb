// modules
const express = require('express');
const { engine } = require('express-handlebars');
const path = require("path")
const mysql = require('mysql2'); 

//connection au serveur Mysql
const db = mysql.createConnection({   host: "10.229.40.227",   user: "root",   password: "Pa$$w0rd" });
db.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); });

//définir la base de donnée à utiliser
db.query("USE Pokemons")

//lancement de l'application
const app = express();

// permettre l'inclusion css
app.use(express.static('public'));

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
    var titleVal = "page principale";
    const name = req.query.name;
    var pokemonImage = "";
    var description = "";
    // mysql
    if (name) {
        console.log("le nom a bien été défini");
        db.query(
            'SELECT * FROM  pokemon WHERE name = ?', [name],
            (err, results) => {
                if (err) {
                    console.error('Erreur lors de la requête:', err);
                    return;
                }

                if (results.length === 0) {
                    description = "pokemon inconnu"
                }

                else {
                    const userID = results[0].pokemon_id
                    console.log(results);
                    pokemonImage = `/pokemons_images/${userID}.webp`;
                    console.log("image :", pokemonImage);
        
                    res.render('layouts/main', {
                        title : titleVal,
                        image : pokemonImage,
                        css:"/css/destop.css",
                        description : description,
                        name :results[0].name,
                        type: `${results[0].type_1} ${results[0].type_2}`,
                        hp : results[0].hit_points,
                        attack: results[0].attack,
                        defense: results[0].defense,
                        aspecial: results[0].special_attack,
                        dspecial: results[0].special_defense,
                        speed: results[0].speed
                    });
                }
            }
        
        )};
});

// lancement du serveur
app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});
