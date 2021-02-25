const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

const Journal = require('../../models/Journal')

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

    // const longAgo = new Date();
    // longAgo.setDate(longAgo.getDate() - 100000);

    const newJournal = new Journal({
        goal: req.params.goalId,
        body: req.body.body,
        success: req.body.success,
        highlights: req.body.highlights,
        media: req.body.media,
        goalState: req.body.goalState,
        cues: req.body.cues,
        rewards: req.body.rewards,
        // createdAt: longAgo,
        // updatedAt: Date.now()
    });

    newJournal.save().then(journal => res.json(journal));
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
        
        journalProps = [  
            //"goal", 
            "body", "success", "highlights", "media", "goalState", "cues", "rewards"
        ];

        for (prop of journalProps) {
          journal[prop] = req.body[prop] || journal[prop];
        }
      
        journal.save()
        .then(journal => res.json(journal));
      })
      .catch(err => res.status(400).json({noJournalFound: "No Journal Found"}));
});

router.delete("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
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
    });

router.patch("/:id", 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const updateObject = req.body;
        const id = req.params.id;
    })

module.exports = router;