const db = require("../databasephp")
const bcrypt = require("bcrypt");
const config = require("../config");
const jwt = require("jsonwebtoken");
const express = require("express");

const router = express.Router();


router.route("/register").post((req, res) => {
    //CHECK EXISTING USER
    const q = "SELECT * FROM Login_web WHERE username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");
  
      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      const q = "INSERT INTO Login_web(`username`,`password`) VALUES (?)";
      const values = [req.body.username, hash];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
});
router.route("/login").post((req, res) => {
    //CHECK USER
  
    const q = "SELECT * FROM Login_web WHERE username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
  
      const token = jwt.sign({ id: data[0].id }, config.key);
      const { password, ...other } = data[0];
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
});
router.route("/logout").post((req, res)=>{

    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("User has been logged out.")
  });



module.exports = router; 
