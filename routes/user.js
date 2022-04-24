const router = require("express").Router();
const { verify } = require("../verifyToken");
const detailRoute = require("./details");
const User = require("../models/User");

router.use("/as", detailRoute);

router.get("/getuser/:id", verify, (req, res) => {
  console.log("user ", req.user);
  const ID = req.params.id;
  res.status(200).json(ID);
});

router.get("/query", (req, res) => {
  res.json(req.query.val);
});

router.put("/update/:idd", async (req, res) => {
  try {
    const changeUser = await User.findByIdAndUpdate(
      req.params.idd,
      {
        $set: req.body,
      },
      { new: true }
    );

    const { password, ...info } = changeUser._doc;

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/updatebyname", async (req, res) => {
  try {
    const myName = await User.findOneAndUpdate();
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
