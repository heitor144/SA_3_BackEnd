const express = require ("express");

const app =  express();

//http://localhost:3000
const port = 3000;

//Importando módulo 'database';
const database = require ("./db/index.js");
database();

//Define o engine de Visualização a ser usado;
app.set ('view engine', 'ejs');

// Configura a sessão do aplicativo, especificando algumas opções como:
// - "secret" é uma chave secreta usada para assinar a sessão, garantindo a sua segurança.
// - "saveUninitialized" é um valor booleano que define se a sessão deve ser salva mesmo que ela não tenha sido modificada.
// - "resave" é um valor booleano que define se a sessão deve ser salva novamente mesmo que ela não tenha sido modificada.
const session = require ("express-session");
app.use (session ({
    secret: 'secretKey',
    saveUninitialized: true,
    resave: false,
}));

app.use ( (req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next ();
})

const router = require ("./routers/index.js");
router (app, express);

app.listen (
    port,
    function (error) {
        if (error) {
            console.log ("Ocorreu Um ERRO ao Encontrar o Servidor!");
            return;
        } else {
            console.log ("Servidor Rodando Com Sucesso!");
        }
    }
)