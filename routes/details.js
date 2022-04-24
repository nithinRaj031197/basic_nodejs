const router = require("express").Router();

router.get("/details", (req, res) => {
  res.json("Complete details");
});

module.exports = router;
