const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calorie: {
    type: Number,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  user:{
    type: String,
    required: true,
  }
});
const Food = mongoose.model("foods", FoodSchema);
module.exports = Food;
