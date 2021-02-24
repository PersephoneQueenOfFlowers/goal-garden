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
const validateGoalCreate = require('../../validation/goal-create');
const validateGoalUpdate = require('../../validation/goal-update');

//routes

//once authenticated -- should be able to access authenticated user via
// req.user
// -- from multiple sources on SO


// goal-index route: GET
// should only be accessible when a user is authenticated
// should return all names + goal status + id's (for linking to goal show page) -- for now just send whole goals down
router.get("/",
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
  //also is test route for now
  // res.json({ msg: "This is the goal route" });
   Goal
    .find({ user: req.user.id })
    .then(goals => res.json(goals))
    .catch(err => res.status(400).json(err));
});


// goal-show route: GET
// should only be accessible when a user is authenticated and current goal belongs to user
// should return all information about the 1 goal 
// (later) should return (maybe all? maybe just first x, or first 10) journals associated with goal
router.get("/:id", 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    debugger
    Goal
      .find({ 
        user: req.user.id,
        _id: req.params.id
      })
      .then(goal => res.json(goal))
      .catch(err => res.status(400).json({noGoalFound: "No Goal Found"}));
});

// goal-create route: POST
// should only be accesible when a user is authenticated and current goal belongs to user
// should only save goal if it passes validations
router.post("/", 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      
      const { isValid, errors } = validateGoalCreate(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      const newGoal = new Goal ({
        user: req.user.id,
        body: req.body.body,
        title: req.body.title,
        expirationDate: req.body.expirationDate,
        // avatar: req.body.avatar,
        // checkInterval: req.body.checkInterval,
        // active: req.body.active,
        // count: req.body.count,
        // streak: req.body.streak
      });
     

      //might have to move keys with default
      //values outside of the newGoal 
      //and only set with if statements, like
      // if (req.body.streak) newGoal[streak] = req.body.streak;
      //
      // need to look into how Mongoose default values work

      newGoal
        .save()
        .then(goal => res.json(goal));

});

// goal-update route: PATCH
// should only be accesible when a user is authenticated and current goal belongs to user
// should only be able to modify goal attributes (not userId or journalIds -- unless )

// could be useful? https://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
router.patch("/:id",  
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const { isValid, errors } = validateGoalUpdate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }


    //need validations so maybe this is best way to do it?
    // mongoose API says: 
    // findAndModify helpers support limited validation. You can enable these by setting the runValidators options, respectively.
    // If you need full-fledged validation, use the traditional approach of first retrieving the document.
    
    Goal
      .find({ 
        user: req.user.id,
        _id: req.params.id
      })
      .then(goal => {
        // Goal.update
        // there is probably a better way to do this, 
        // will look into it later

        // goal.body = req.body.body || goal.body;
        // goal.title = req.body.title || goal.title;
        // goal.expirationDate = req.body.expirationDate || goal.expirationDate;
        // goal.avatar = req.body.avatar || goal.avatar;
        // goal.checkInterval = req.body.checkInterval || goal.checkInterval;
        // goal.active = req.body.active || goal.active;
        // goal.count = req.body.count || goal.count;
        // goal.streak = req.body.streak || goal.streak;

        goalProps = ["body", "title", "expirationDate",  
        //"avatar", "checkInterval", "active", "count", "streak"
        ];

        for (prop of goalProps) {
          goal[prop] = req.body[prop] || goal[prop];
        }
      
        

        goal.save()
        .then(goal => res.json(goal));
      })
      .catch(err => res.status(400).json({noGoalFound: "No Goal Found"}));
});

// goal-delete route: DESTROY
// should only be accesible when a user is authenticated and current goal belongs to user
// destroys all associated journals

// https://stackoverflow.com/questions/43851589/mongoose-delete-selected-element
router.delete("/:id",  
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    

    Goal
      .findOneAndRemove({
        user: req.user.id,
        _id: req.params.id
      })
      .then(goal => {
        res.json(goal);
        res.redirect("/");
      })
      .catch(err => res.status(400).json({noGoalFound: "No Goal Found"}));
    // Goal
    //   .findByIdAndRemove(req.params.id, (err, deletedGoal) => {
    //     if (err){
    //       res.status(500);
    //     } else if (!deletedGoal){
    //       res.status(404);
    //     }
    //     res.redirect("/")
    //   })
    //   .catch(err => res.status(400).json({noGoalFound: "No Goal Found"}));
      
});

module.exports = router;
