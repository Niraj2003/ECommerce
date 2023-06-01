const express = require("express");
const bcrypt = require('bcrypt');

const Users = require("../models/user");
const cart = require("../models/cart");

const { requireLogin } = require("../middleware");
const router = express.Router();

router.get("/signup", function(req,res){
    if(req.session.user_id) res.render("temp", {message: "Already Logged In"});
    else res.render("signup");
})

router.post("/signup", function(req,res){
    const {acctype, name, email,password} = req.body;
    const hash2 = bcrypt.hashSync(password, 10);
    console.log(hash2);
    const NewUser = new Users({acctype, name, email, password : hash2});
    NewUser.save()
    res.render('home', {message:"New User created Successfully"});
})

router.get("/login", function(req,res){
    if(req.session.user_id) res.render("temp", {message: "Already Logged In"});
    else res.render("login",{message:null});
})

router.post("/login", async function(req, res) {
    const {acctype, email, password} = req.body;
    const user = await Users.findOne({email, acctype});
    if(!user) return res.render('temp',{message:"User not found"});
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid){
        req.session.user_id = user._id;
        res.render('home',{message:null});
    } 
    else{
        res.render('temp',{message:"Wrong Credentials"});
    }
});

router.get("/profile",requireLogin, async function(req,res){
    const user = await Users.findById(req.session.user_id);
    res.render('profile',{loggedUser:user});
})

router.post("/logout", function(req,res){
    req.session.user_id = null;
    res.render('home', {message:"User Logged Out"});
})

router.get("/mycart", requireLogin, async function(req,res){
    const user = await Users.findById(req.session.user_id);
    const prods =await cart.find({useremail : user.email});
    res.render("mycart", {mcart : prods, user});
})

router.get("/invoice", requireLogin, async function (req, res) {
    const user = await Users.findById(req.session.user_id);
    const prods = await cart.find({ useremail: user.email });
    res.render("invoice", {mcart: prods,user});
});

module.exports = router;