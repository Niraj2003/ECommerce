const express = require("express");

const Users = require("../models/user");

const router = express.Router();
const { requireLogin } = require("../middleware");

const kids = require("../models/kids");
const men = require("../models/men");
const women = require("../models/women");

router.get("/additem", requireLogin, async function(req,res){
    const user = await Users.findById(req.session.user_id);
    if(user.acctype==='seller') return res.render('additem');
    res.render('home', {message: "To add product you have to logged in with seller account"})
})

router.post("/additem", function(req, res){
    if(req.body.sect === "kids"){
        const {name,price,image} = req.body;
        const k = new kids({name, price, image});
        k.save()
        res.render('home',{message:"Item Added"});
    }
    if(req.body.sect === "men"){
        const {name,price,image} = req.body;
        const k = new men({name, price, image});
        k.save()
        res.render('home',{message:"Item Added"});
    }
    if(req.body.sect === "women"){
        const {name,price,image} = req.body;
        const k = new women({name, price, image});
        k.save()
        res.render('home',{message:"Item Added"});
    }
});

module.exports = router;