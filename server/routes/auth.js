const router = require("express").Router();
const User = require("../models/User");

//register
router.post("/register", async (req, res) => {
  const newUser = new User({
    ...req.body,
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    !user && res.status(404).send("User not found");

    !user.password === password && res.status(400).json("Wrong password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
