const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ecommerce:e$1234@cluster0.wt6n0rb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

const Product = {
    productName : String,
    productDes : String,
    productImage : Buffer,
    price : Number,
    stock : Number
};

const Products = mongoose.model("Products", Product);

app.get("/", function(req,res){
    Products.find({})
        .then(prods => {
            res.render("home", {
                allProducts : prods
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Error retrieving products from database");
        });
    // res.render("home");
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

app.listen(3000, function(){
    console.log("Server stated at 3000");
})
