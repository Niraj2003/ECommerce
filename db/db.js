const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://ecommerce:e$1234@cluster0.wt6n0rb.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


module.exports = db;