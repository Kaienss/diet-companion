const User = require("../Models/User");
const Food = require("../Models/Food");
const options = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
}
const registerView = (req, res) => {
  res.render("register", {});
};
// For View
const loginView = (req, res) => {
  res.render("login", {});
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      console.log("wrong email");
      res.redirect("/login");
    } else {
      const foodList = await Food.find({ email: user.email });
      res.cookie('id', user._id.toString(), options)
      res.render("dashboard", {
        user: { email: user.email, name: user.name },
        foods: foodList,
      });
    }
  }
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await new User({
    name,
    email,
    password,
  });
  newUser.save();
  res.redirect("/login");
};
module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};
