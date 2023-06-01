const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');

const user = require('./routes/user');
const products = require('./routes/products');
const seller = require('./routes/seller');

const db = require('./db/db');

const app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views"));

const sessionConfig = {
    secret: 'mynameisnirajamrutkar!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use('/',user);
app.use('/',seller);
app.use('/',products);

app.listen(3000, function(){
    console.log("Server stated at 3000");
})
