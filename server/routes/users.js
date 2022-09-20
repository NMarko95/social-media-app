const router = require("express").Router();
const User = require("../models/User");

//update
router.put("/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow

//unfollow

module.exports = router;