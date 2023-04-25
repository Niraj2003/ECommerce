const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menProd = {
    name : String,
    price: Number
};

module.exports = mongoose.model("menprod", menProd); 