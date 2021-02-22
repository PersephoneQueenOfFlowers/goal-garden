// node packages
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const passport = require('passport');

//router
const router = express.Router();
//model
const Goal = require('../../models/Goal');
//keys
const keys = require('../../config/keys');

//validations
// const validateRegisterInput = require('../../validation/register');
// const validateLoginInput = require('../../validation/login');

//routes

//once authenticated -- should be able to access authenticated user via
// req.user
// -- from multiple sources on SO


// goal-index route: GET
// should only be accessible when a user is authenticated
// should return all names + goal status + id's (for linking to goal show page) -- for now just send whole goals down
router.get("/", (req, res) => {
  //also is test route for now
  res.json({ msg: "This is the goal route" });
  //  Goal
  //   .find()
  //   .sort({ date: -1 })
  //   .then(goals => res.json(goals))
  //   .catch(err => res.status(400).json(err));
});


// goal-show route: GET
// should only be accessible when a user is authenticated and current goal belongs to user
// should return all information about the 1 goal 
// (later) should return (maybe all? maybe just first x, or first 10) journals associated with goal
router.get("/:id", 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Goal
      .findById(req.params.id)
      .then(goal => res.json(goal))
      .catch(err => res.status(400).json(err));
});

// goal-create route: POST
// should only be accesible when a user is authenticated and current goal belongs to user
// should only save goal if it passes validations
router.post("/:id", 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  
      const { isValid, errors } = validateGoalInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newGoal = new Goal ({

      });
});

// goal-update route: PATCH
// should only be accesible when a user is authenticated and current goal belongs to user
// should only be able to modify goal attributes (not userId or journalIds -- unless )
router.patch("/:id",  
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  
});

// goal-delete route: DESTROY
// should only be accesible when a user is authenticated and current goal belongs to user
// destroys all associated journals
router.destroy("/:id",  
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  
});


