const express = require("express");

const Users = require("../models/user");
const women = require("../models/women");
const kids = require("../models/kids");
const men = require("../models/men");
const cart = require("../models/cart");

const { requireLogin } = require("../middleware");
const router = express.Router();

router.get("/", function(req,res){
    res.render('home',{message:null});
})

router.get("/about", function(req,res){
    res.render("about");
})

router.get("/contact", function(req,res){
    res.render("contact");
})

router.get("/menproducts", async function(req,res){
    const prods = await men.find({});
    res.render("menProducts", {menProducts: prods});
})

router.get("/womenproducts", async function(req,res){
    const prods = await women.find({});
    res.render("womenProducts", {womenProducts: prods});
})

router.get("/kidsproducts", async function(req,res){
    const prods = await kids.find({});
    res.render("kidsProducts", {kidsProducts: prods});
})

router.post("/kidsproducts", requireLogin, async function(req,res){
    const user = await Users.findById(req.session.user_id);
    const {name,price,quantity,image} = req.body;
    const k = new cart({useremail : user.email, name, price, quantity, image});
    k.save();
    res.redirect('/mycart');
})

router.post("/menproducts",requireLogin, async function(req,res){
    const user = await Users.findById(req.session.user_id);
    const {name,price,quantity,image} = req.body;
    const k = new cart({useremail : user.email, name, price, quantity, image});
    k.save();
    res.redirect('/mycart');
})

router.post("/womenproducts",requireLogin, async function(req,res){
    const user = await Users.findById(req.session.user_id);
    const {name,price,quantity,image} = req.body;
    const k = new cart({useremail : user.email, name, price, quantity, image});
    k.save();
    res.redirect('/mycart');
})

module.exports = router;