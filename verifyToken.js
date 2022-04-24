const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeaders = req.headers.token;

  if (authHeaders) {
    const token = authHeaders.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
      if (error) res.status(403).json("Token is invalid");

      req.user = data;

      next();
    });
  } else {
    res.status(401).json("You are unauthenticated");
  }
};

// const print = (req, res, next) => {
//   console.log(req.user);
//   console.log("Hi");
//   req.user = req.user;
//   next();
// };

module.exports = { verify };
