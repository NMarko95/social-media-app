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
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get users friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    const friendList = friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      return {
        _id,
        username,
        profilePicture,
      };
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow
router.put("/:id/follow", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).json("User has been followed.");
    } else {
      res.status(403).json("You've already followed this user.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//unfollow
router.put("/:id/unfollow", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (user.followers.includes(req.body.userId)) {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).json("User has been unfollowed.");
    } else {
      res.status(403).json("You are not following this user.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
