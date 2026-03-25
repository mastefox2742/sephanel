const express = require('express');
const Datastore = require('nedb');
const path = require('path');
const app = express();

// Bases de données locales (fichiers .db)
const usersDB = new Datastore({ filename: 'users.db', autoload: true });

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route test pour l'inscription
app.post('/api/register', (req, res) => {
    usersDB.insert(req.body, (err, newUser) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ message: 'Utilisateur créé !', user: newUser });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('====================================');
    console.log('🚀 SERVEUR LANCÉ !');
    console.log('Lien : http://localhost:3000');
    console.log('====================================');
});
