const Food = require("../Models/Food");
const User = require("../Models/User");
// For View
const dashboardView = async (req, res) => {
  const id = cookieParser(req.headers.cookie, "id");
  const foodList = await Food.find({ user: id });
  const currentUser = await User.findById(id);
  res.render("dashboard", {
    user: currentUser,
    foodList: foodList,
  });
};

module.exports = {
  dashboardView,
};
