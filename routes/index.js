const express = require("express");
const {
  registerView,
  loginView,
  registerUser,
  loginUser,
} = require("../controllers/loginController");
const { dashboardView } = require("../controllers/dashboardController");
const { searchView, searchFood } = require("../controllers/foodController");
const router = express.Router();
router.get("/register", registerView);
router.post("/register", registerUser);
router.get("/login", loginView);
router.post("/login", loginUser);
router.get("/dashboard", dashboardView);
router.get("/search", searchView);
router.post("/search", searchFood);
module.exports = router;
