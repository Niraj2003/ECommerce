const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cart = new Schema({
    useremail : String,
    name : String,
    quantity : Number,
    price: Number,
    image: String
});

module.exports = mongoose.model("cart", cart);
