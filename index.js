const express = require("express");
const multer  = require("multer");
const cookieParser  = require("cookie-parser");
const authRoutes = require ("./routes/login");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());


data = {
    msg: "Welcome",
    info: "This is a server for final project of Hoang Vy",
    Working: "If you have any question, you can contact to me via my phone number 0708208055 (Hoang Vy)",
  };

app.route("/").get((req, res) => res.json(data));
app.use("/users", authRoutes);


app.listen(port, () => {
    console.log(`Connected on port: ${port}`);
  });
  