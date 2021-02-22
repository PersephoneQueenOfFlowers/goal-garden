// node packages
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const passport = require('passport');

//router
const router = express.Router();
//model
const User = require('../../models/User');
//keys
const keys = require('../../config/keys');

//validations
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => {
  res.json({ msg: "This is the user route" });
});

router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    firstName: req.user.firstName,
    email: req.user.email
  });
});

router.post('/register', (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);

  // if(!isValid){
  //   return res.status(400).json(errors);
  // }

  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      return res.status(400).json({ email: "A user is already registered with that email."})
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
      })

      bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save().then(user => res.send(user))
                        .catch(err => res.send(err));
        })
      })
    }
  });
});

router.post('/login', (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const email = req.body.email;
  const password = req.body.password;
  
  //find will give an array, findOne will find first I believe?
  User.findOne({ email })
    .then(user => {
      if(!user) {
        return res.status(404).json({ email: "This user does not exist."})
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch){
            const payload = {
              id: user.id,
              firstName: user.firstName,
              email: user.email
            }
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            )
          } else {
            return res.status(400).json({ password: "Incorrect password" });
          }
        })
    })

})

module.exports = router;