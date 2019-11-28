const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

router.put("/updateDetails", (req, res) => {
  const { id, name, email, password } = req.body;

  if (!id) {
    return res.status(400).json({ msg: "ID is required!" });
  }

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required!" });
  }

  var updatedUser = {
    name: name,
    email: email,
    password: password
  };

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      updatedUser.password = hash;

      User.findByIdAndUpdate(id, updatedUser, { new: true }, function(
        err,
        user
      ) {
        res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          },
          success: true
        });
      });
    });
  });
});

module.exports = router;
