const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

const Journal = require('../../models/Journal')

router.get('/goal/:goal_id', (req, res) => {
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
    const { errors, isValid } = validateJournalInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newJournal = new Journal({
        goal: req.goal.id,
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

module.exports = router;