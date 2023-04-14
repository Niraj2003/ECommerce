const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var isLogin = false;

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views"));

mongoose.connect("mongodb+srv://ecommerce:e$1234@cluster0.wt6n0rb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

app.get("/", function(req,res){
    res.render("home");
})

app.get("/about", function(req,res){
    res.render("about");
})

app.get("/additem", function(req,res){
    res.render("additem");
})

app.post("/additem", function(req, res){
    const p = new Products ({
        productName: req.body.pname,
        productDes: req.body.pdes,
        productImage : req.body.pImage,
        price: req.body.pprice,
        stock: req.body.stock
    });
    p.save()
        .then(function(product) {
            console.log("Product added: ", product);
            res.status(200).send("Product added successfully");
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).send("Error adding product");
        });
});

app.get("/products", function(req,res){
    Products.find({})
        .then(prods => {
            res.render("products", {
                allProducts : prods
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error retrieving products from database");
        });
})

app.get("/contact", function(req,res){
    res.render("contact");
})

app.get("/login", function(req,res){
    if(isLogin) res.render("temp", {message: "Already Logged In"});
    else res.render("login");
})

app.get("/signup", function(req,res){
    if(isLogin) res.render("temp", {message: "Already Logged In"});
    else res.render("signup");
})

app.get("/profile",function(req,res){
    if(isLogin) res.render("profile", {loggedUser});
    else res.render("temp", {message : "Login first"});
})

const userSchma = {
    acctype : String,
    name : String,
    email : String, 
    password : String,
};
const Users = mongoose.model("users", userSchma); 

app.post("/signup", function(req,res){
    const hash2 = bcrypt.hashSync(req.body.password, 10);
    console.log(hash2);
    const NewUser = new Users({
        acctype : req.body.acctype,
        name : req.body.name,
        email : req.body.email,
        password : hash2,
    });
    NewUser.save()
        .then(()=> {
            res.render("temp", {message: "Registered Successfully"});
        })
        .catch((err)=>{
            res.render("temp", {message: "ERR Occured"});
        })
})

var loggedUser = {
    acctype : "",
    name : "",
    email : "",
}

app.post("/login", function(req, res) {
    Users.findOne({ email: req.body.email, acctype: req.body.acctype })
        .then(function(foundUser) {
            const hash1 = bcrypt.hashSync(req.body.password, 10);
            console.log(hash1);
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                isLogin = true;
                loggedUser.acctype = foundUser.acctype;
                loggedUser.name = foundUser.name;
                loggedUser.email = foundUser.email;
                console.log(loggedUser.name, loggedUser.email);
                res.render("temp", { message: "Login Successfully" });
            } 
            else {
                res.render("temp", { message: "Wrong ID and Password" });
            }
        })
        .catch(function(err) {
            console.error(err);
            res.render("temp", { message: "An error occurred while logging in" });
    });
});

const menProd = {
    name : String,
    price: Number
};
const menProducts = mongoose.model("menprod", menProd); 

app.get("/menproducts", function(req,res){
    menProducts.find({})
    .then(prods => {
        res.render("menProducts", {
            menProducts : prods
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error retrieving products from database");
    });
})


const womenProd = {
    name : String,
    price: Number
};
const womenProducts = mongoose.model("womenprod", womenProd); 

app.get("/womenproducts", function(req,res){
    womenProducts.find({})
    .then(prods => {
        res.render("womenProducts", {
            womenProducts : prods
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error retrieving products from database");
    });
})

const kidsProd = {
    name : String,
    price: Number
};
const kidsProducts = mongoose.model("kidsprod", kidsProd); 

app.get("/kidsproducts", function(req,res){
    kidsProducts.find({})
    .then(prods => {
        res.render("kidsProducts", {
            kidsProducts : prods
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Error retrieving products from database");
    });
})
app.listen(3000, function(){
    console.log("Server stated at 3000");
})
