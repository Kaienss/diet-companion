const axios = require("axios");
//js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4111;
const User = require("./Models/User");
app.listen(PORT, console.log("Server don start for port: " + PORT));
const mongoUrl =
  "mongodb+srv://Jage:021032@cluster0.mjbiv.mongodb.net/dumbRecipe?authSource=admin&replicaSet=atlas-ph2473-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose
  .connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(async() => {
    console.log("database connected");
    let users = await User.find()
    console.log(users)
  })
  .catch((err) => console.log(err));



  const options = {
    method: 'GET',
    url: 'https://nutritionix-api.p.rapidapi.com/v1_1/search/cheddar%20cheese',
    params: {fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat'},
    headers: {
      'X-RapidAPI-Key': '5b7a1074b8mshfbcb089adddaf16p154e1ejsn5575f25f322a',
      'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });