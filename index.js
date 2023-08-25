// Importer express
const express = require("express");

// Initialiser express
const app = express();

// Configurer le moteur de template EJS
app.set("view engine", "ejs");

// ---------- Code de Auth0 -------- //

// 1. Importer express-openid-connect
const { auth } = require("express-openid-connect");

// 2. Configurer avec un objet les paramètres de connexion Auth0
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: "a long, randomly-generated string stored in env",
    baseURL: "http://localhost:3000",
    clientID: "7pMy8GrsX7I6xgVk1OsUYz4RAVMnUcZS",
    issuerBaseURL: "https://dev-m6hbnwzejhsfrvsw.eu.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.render(req.oidc.isAuthenticated() ? 'index' : 'login');
});

// Profil
const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
    const userData = JSON.stringify(req.oidc.user);
    const user = JSON.parse(userData);
    console.log(user);
    res.render('profile', { user });
});

// ---------- Fin du code de Auth0 -------- //

// Lance le serveur sur le port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
