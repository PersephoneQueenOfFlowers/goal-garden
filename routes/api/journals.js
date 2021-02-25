const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Journal = require('../../models/Journal');
const Goal = require('../../models/Goal');

const validateJournalInput = require("../../validation/journal");
const validateJournalUpdate = require("../../validation/journal-update");

router.get('/goal/:goalId', (req, res) => {
    Journal.find({ goal: req.params.goalId })
    .then(journals => res.json(journals))
    .catch(err => res.status(404).json({ nojournalsfound: 'No Journals found'}));
});

router.get('/:id', (req, res) => {
    Journal.findById(req.params.id)
    .then(journal => res.json(journal))
    .catch(err => res.status(404).json({nojournalfound: 'No journal found'}));
});

router.post('/:goalId', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateJournalInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Goal
    .findOne({
        user: req.user.id,
        _id: req.params.goalId
    })
    .then(goal => {
        const createdDay = new Date();
        createdDay.setDate(createdDay.getDate() - Number(req.body.days));
    
        const failGoalStateUpdate = {0:0, 1:0, 2:1, 3:4, 4:5, 5:6, 6:6};
        const succeedGoalStateUpdate = {0:1, 1:2, 2:3, 3:3, 4:3, 5:4, 6:5};
        let goalState = goal.goalState;

        if(req.body.success){
            goalState = succeedGoalStateUpdate[goalState];
        } else {
            goalState = failGoalStateUpdate[goalState];
        }

        const newJournal = new Journal({
            goal: goal.id,
            body: req.body.body,
            success: req.body.success,
            highlights: req.body.highlights,
            media: req.body.media,
            goalState: goalState,
            cues: req.body.cues,
            rewards: req.body.rewards,
            createdAt: createdDay
        });
    
        newJournal
            .save()
            .then(journal => res.json(journal))
            .then(() => {
                goal.goalState = goalState;
                goal.save().then(() => res.json({ "goalUpdate" : `Goalstate updated to ${goalState}`}));
            });
    })
    .catch(() => res.status(404).json({ "goalError": "No Goal Found" }));
});

router.patch("/:id",  
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const { isValid, errors } = validateJournalUpdate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Journal
    .findOne({ 
    _id: req.params.id
    })
    .then(journal => {

        //for now make it so that journals cannot be moved from one goal
        //to another because otherwise we would need to verify that
        //the other goal belongs to current user
        // and would then mess up the goal progress and whatnot.
        
        if(!journal.success) {
            // journalProps = [  
            //     //"goal", 
            //     "body", "success", "highlights", "media", "goalState", "cues", "rewards"
            // ];
    
            // for (prop of journalProps) {
            //   journal[prop] = req.body[prop] || journal[prop];
            // }

            journal.body = req.body.body
          
            journal.save()
            .then(journal => res.json(journal));
        } else {
            res.status(400).json({ journalError: "Journal cannot be edited"});
        }
    })
    .catch(err => res.status(400).json({ noJournalFound: "No Journal Found" }));
});

router.delete("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Journal
            .findById(req.params.id)
            .then(journal => {
                Goal.findOne({
                    user: req.user.id,
                    _id: journal.goal
                })
                .then(goal => {
                    // if the goal exists, but belongs to another person,
                    // Goal.findOne returns null -- which is not a failure!
                    // so it was still removing the goals -- so need to make sure the returned goal
                    // isn't null -- otherwise shouldn't have access
                    if (!goal) return res.status(400).json({ unAuthorized: "Not Your Journal!"})
                    Journal
                    .findByIdAndRemove(req.params.id, (err, deletedJournal) => {
                        if (err) {
                            res.status(500);
                        } else if (!deletedJournal) {
                            res.status(404);
                        } else {
                            res.json(deletedJournal)
                        }
                    })
                })
                .catch(() => res.status(400).json({ unAuthorized: "Not Your Journal!"}))
            })
            .catch(() => res.status(400).json({ journalError: "No Journal Found"}));
    });

router.delete("/goal/:goalId",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Journal
            .deleteMany({
                goal: req.params.goalId
            })
            .then(res.json( { "msg": "done" }));
    }
);


module.exports = router;