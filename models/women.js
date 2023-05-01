const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const womenProd = {
    name : String,
    price: Number,
    image :String
};

module.exports = mongoose.model("womenprod", womenProd); 