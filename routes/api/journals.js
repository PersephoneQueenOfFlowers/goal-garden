const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

const Journal = require('../../models/Journal')

const validateJournalInput = require("../../validation/journal")

router.get('/goal/:id', (req, res) => {
    Journal.find({goal: req.params.goal_id})
    .then(journals => res.json(journals))
    .catch(err => res.status(404).json({ nojournalsfound: 'No Journals found'}));
});

router.get('/:id', (req, res) => {
    Journal.findById(req.params.id)
    .then(journal => res.json(journal))
    .catch(err => res.status(404).json({nojournalfound: 'No journal found'}));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    debugger
    const { errors, isValid } = validateJournalInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newJournal = new Journal({
        goal: req.goal,
        body: req.body.body,
        success: req.body.success,
        highlights: req.body.highlights,
        media: req.body.media,
        goalState: req.body.goalState,
        cues: req.body.cues,
        rewards: req.body.rewards
    });

    newJournal.save().then(journal => res.json(journal));
});

router.delete('/journal/:id', (req, res) => {
    Journal.find({id: req.params.id})
    .then(journals => res.json(journals))
    .catch(err => res.status(404)).json({ nojournalsfound: 'No Journals found' })
});

module.exports = router;