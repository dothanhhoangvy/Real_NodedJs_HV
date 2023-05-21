const pool = require("../databasephp");
const bcrypt = require("bcrypt");
const config = require("../config");
const jwt = require("jsonwebtoken");
const express = require("express");
let middleware = require("../middleware");
const router = express.Router();

router.route("/location").get((req, res) => {
  const q = "SELECT DISTINCT latitude, longitude FROM location;";
  pool.query(q, function (err, data) {
    if (err) throw err;
    return res.json(data[0]);
  });
});

router.route("/fuel").get((req, res) => {
  const q = "SELECT DISTINCT Fuel, Time FROM Engine_fuel_information";
  pool.query(q, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var data1 = JSON.parse(JSON.stringify(data));
      return res.json(data1);
    }
  });
});
router.route("/engtmp").get((req, res) => {
  const q = "SELECT DISTINCT Temperature, Time FROM Temperature_information";
  pool.query(q, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var data1 = JSON.parse(JSON.stringify(data));
      return res.json(data1);
    }
  });
});
router.route("/speed").get((req, res) => {
  const q = "SELECT DISTINCT Engine_Speed, Time FROM Engine_speed_information";
  pool.query(q, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var data1 = JSON.parse(JSON.stringify(data));
      return res.json(data1);
    }
  });
});

module.exports = router;
