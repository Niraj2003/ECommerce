const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menProd = {
    name : String,
    price: Number,
    image: String
};

module.exports = mongoose.model("menprod", menProd); 