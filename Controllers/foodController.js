const { cookieParser } = require("./../Utils/util");
const axios = require("axios");
const Food = require("../Models/Food");
const User = require("../Models/User");

const saveFood = async (foodRes, id) => {
  const foodToSave = new Food({
    type: "food",
    name: foodRes.item_name,
    calorie: foodRes.nf_calories,
    user: id,
  });
  await foodToSave.save();
};
const saveDrink = async (foodRes, id) => {
  const foodToSave = new Food({
    type: "drink",
    name: foodRes.item_name,
    calorie: foodRes.nf_calories,
    user: id,
  });
  await foodToSave.save();
};
const createFood = async (foodRes, type, id) => {
  switch (type) {
    case "1":
      await saveDrink(foodRes, id);
      break;
    case "2":
      await saveFood(foodRes, id);
      break;
  }
};
const searchForFood = async (name) => {
  const options = {
    method: "GET",
    url: "https://nutritionix-api.p.rapidapi.com/v1_1/search/" + name,
    params: { fields: "item_name,item_id,brand_name,nf_calories,nf_total_fat" },
    headers: {
      "X-RapidAPI-Key": "5b7a1074b8mshfbcb089adddaf16p154e1ejsn5575f25f322a",
      "X-RapidAPI-Host": "nutritionix-api.p.rapidapi.com",
    },
  };

  const result = await axios.request(options);
  return result.data;
};
const searchView = (req, res) => {
  res.render("search", {});
};

const searchFood = async (req, res) => {
  const { name, type } = req.body;
  const id = cookieParser(req.headers.cookie, "id");
  if (!global.ObjectPool[name]) {
    const foodResult = await searchForFood(name);
    if (foodResult.hits.length > 0) {
      await createFood(foodResult.hits[0].fields, type, id);
      global.ObjectPool[name] = {
        foodRes: foodResult.hits[0].fields,
        type: type,
      };
    }
    console.log("food does not exist in object pool");
  } else {
    console.log("food does exist in object pool");
    await createFood(
      global.ObjectPool[name].foodRes,
      global.ObjectPool[name].type,
      id
    );
  }
  const foodList = await Food.find({ user: id });
  const currentUser = await User.findById(id);
  res.render("dashboard", {
    user: currentUser,
    foods: foodList,
  });
};
module.exports = {
  searchView,
  searchFood,
};
