const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kidsProd = {
    name : String,
    price: Number,
    image: String
};

module.exports = mongoose.model("kidsprod", kidsProd); 