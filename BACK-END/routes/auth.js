const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { findOne } = require("../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
JWT_SECRET = "Madhumita";

//ROUTE1-create a user-localhost:5000/api.auth/createuser
router.post(
  "/createuser",
  [
    body("email", "enter valid email").isEmail(),
    body("name", "length should be more than 3 characters").isLength({
      min: 3,
    }),
    body("password", "min length should be 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    //if there are errors return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success,error: "user alredy exist with this email" });
      }
      //securing password using salt pepper and hashing
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(jwtData);
      success=true;
      res.json({ success,authToken });
      //catch errors
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);

//ROUTE2-authenticate a user- localhost:5000/api.auth/login
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "pw cant be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({ success,error: "invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        sucess=false;
        return res.status(400).json({success, error: "invalid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);

//ROUTE3-get loggedin user details- localhost:5000/api.auth/getuser - login required
router.post(
  "/getuser", fetchuser,async (req, res) => {
    try {
     userID=req.user.id;
      let user = await User.findById(userID).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error occured");
    }
  }
);

module.exports = router;
