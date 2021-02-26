// node packages
const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const passport = require('passport');

//router
const router = express.Router();
//models
const Goal = require('../../models/Goal');
const Journal = require('../../models/Journal');
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
    .sort('-createdAt')
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
    Goal
      .findOne({ 
        user: req.user.id,
        _id: req.params.id
      })
      .then(goal => {
        if (!goal) return res.status(400).json({ noGoalFound: "No Goal Found!"});
        res.json(goal)
      })
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

      // const createdDay = new Date();
      // createdDay.setDate(createdDay.getDate() - Number(req.body.days));
      // const exprDate = new Date(createdDay);
      // exprDate.setDate(exprDate.getDate() + 2);

      Goal.findOne({
        user: req.user.id,
        title: req.body.title
      }).then(goal => {
        if (goal) return res.status(400).json({ GoalError: "Goals must have unique titles!"});
        const newGoal = new Goal ({
          user: req.user.id,
          body: req.body.body,
          title: req.body.title,
          // expirationDate: exprDate,
          expirationDate: req.body.expirationDate,
          checkInterval: req.body.checkInterval,
          // avatar: req.body.avatar,
          // active: req.body.active,
          // count: req.body.count,
          // streak: req.body.streak
          // createdAt: createdDay
        });
       
  
        //might have to move keys with default
        //values outside of the newGoal 
        //and only set with if statements, like
        // if (req.body.streak) newGoal[streak] = req.body.streak;
        //
        // need to look into how Mongoose default values work
  
        newGoal
          .save()
          .then(goal => {

            newJournal = new Journal({
              success: true,
              goal: goal.id,
              body: "Created a new goal! Every journey starts with a single step!",
              createdAt: goal.createdAt,
              goalState: 0
            });
            
            newJournal.save()
            .then(() => res.json(goal));
          });

      });

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
      .findOne({ 
        user: req.user.id,
        _id: req.params.id
      })
      .then(goal => {
        if (!goal) return res.status(400).json({ unAuthorized: "Not Your Goal!"});
        goalProps = [
          "body", "expirationDate", "checkInterval",
        // "avatar", "active", "count", "streak"
        ];

        for (prop of goalProps) {
          goal[prop] = req.body[prop] || goal[prop];
        }
        // looks like can just add index to mongoose as well --
        // from https://stackoverflow.com/questions/16061744/mongoose-how-to-define-a-combination-of-fields-to-be-unique
        // goal.index({ user: 1, title: 1 }, { unique: true})
        if(req.body.title !== goal.title){
          Goal
          .findOne({
            user: req.user.id,
            title: req.body.title
          })
          .then(sameNewTitleGoal => {
            debugger
            if (sameNewTitleGoal) return res.status(400).json({ GoalError: "Goals must have unique titles!"});
            goal.title = req.body.title;
            goal.save()
            .then(goal => res.json(goal));
          })
        } else {
          debugger
          goal.save()
          .then(goal => res.json(goal));
        }
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
      })
      .catch(err => res.status(400).json({noGoalFound: "No Goal Found"}));
      
});

module.exports = router;
