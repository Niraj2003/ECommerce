const mongoose = require('mongoose');
mongoose.connect("<MONGO_DB_URL>", {useNewUrlParser: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


module.exports = db;
