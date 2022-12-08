const User = require("./Models/User");

//js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4111;
global.ObjectPool = {}
const mongoUrl =
  "mongodb+srv://Jage:021032@cluster0.mjbiv.mongodb.net/dumbRecipe?authSource=admin&replicaSet=atlas-ph2473-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose
  .connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(async () => {
    console.log("database connected");
    let users = await User.find();
    console.log(users);
  })
  .catch((err) => console.log(err));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/", require("./routes/index"));
app.listen(PORT, console.log("Server has started at port " + PORT));

