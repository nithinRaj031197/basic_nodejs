const router = require("express").Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const User = require("../models/User");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    isAdmin: req.body.isAdmin,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const { _id, password, ...info } = savedUser._doc;
    res.status(201).json(info);
  } catch (error) {
    res.status(500).json(error);
  }

  //   res.status(201).json({ newUser, access_token });
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong email");

    const originalPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json("Invalid password");
    }

    const access_token = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "5d",
      }
    );

    const { password, ...userInfo } = user._doc;

    res.status(200).json({ userInfo, access_token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
