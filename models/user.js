const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchma = {
    acctype : String,
    name : String,
    email : String, 
    password : String,
};

module.exports = mongoose.model("users", userSchma); 