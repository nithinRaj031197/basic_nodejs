const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/user.js");

const app = express();

dotenv.config();

const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/user", userRoute);

app.listen(5000, () => console.log("Server running on 5000"));
