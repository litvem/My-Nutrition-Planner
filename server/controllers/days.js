var express = require('express');
var router = express.Router();

var Day = require('../models/day');
const User = require('../models/user');

var daysPath = '/api/profiles/:profileId/days';
var specificDayPath = '/api/profiles/:profileId/days';

//Create day
router.post(daysPath, function(req, res, next) {
    User.findById(req.params.profileId)
    .exec()
    .then(user => {
        if(user == null) {
            return res.status(404).json({ message: "User not found" });
        }

        var dayId = user.days.length + 1;
        var day = new Day({
            name: req.body.name,
            week: req.body.week,
            year: req.body.year,
            recipes: req.body.recipes
        });

        day.save()

        res.status(201).json({
            dayCreated: day,
            links: {
                rel: "self",
                type: "GET",
                url: 'http://localhost:3000/api/profiles' + user._id + '/days/' + day._id
            }
        });

        user.days.push(day);
        user.save();
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Get all days
router.get(daysPath, function(req, res, next) {
    User.findById({ _id: req.params.profileId })
    .populate('days')
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        } else if(user.days.length === 0) {
            return res.status(404).json({ message: "Day not found"});
        } else {
            return res.status(200).json({
                days: user.days,
                link: {
                    rel: "Day",
                    type: "POST",
                    url: 'http://localhost:3000/api/profiles' + user._id + 'days'
                }
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });    
});

//Get specific day
router.get(specificDayPath, function(req, res, next) {
    User.findOne({ _id: req.params.profileId })
    .populate({ path: 'days', match: { _id: { $eq: req.params.dayId }}})
    .exec()
    .then(user => {
        if(user == null) {
            return res.status(404).json({ message: "User not found" });
        }
        if(user.days.length === 0) {
            return res.status(404).json({ message: "Day not found" })
        }

        res.status(200).json({
            days: user.days,
            links: {
                rel: "self",
                type: "PATCH",
                url: 'http://localhost:3000/api/profiles' + user._id + '/days/' + user.days._id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

//Change - change to patch select specific
router.put(specificDayPath, function(res, req, next) {
    User.findOne({ _id: req.params.profileId })
    .populate({ path: 'days', match: { _id: { $eq: req.params.dayId }}})
    .exec()
    .then(user => {
        if(user == null) {
            return res.status(404).json({ message: "User not found" });
        }
        if(user.days.length === 0) {
            return res.status(404).json({ message: "Day not found" });
        }
        Day.findById({ _id: req.params.dayId })
        .exec()
        .then( day => {
            day.name = req.body.name;
            day.week = req.body.week;
            day.year = req.body.year;
            day.recipes = req.body.recipes;

            day.save();

            res.status(200).json({
                updateDay: day,
                links: {
                    rel: "self",
                    type: "GET",
                    url: 'http://localhost:3000/api/profiles' + user._id + '/days' + day._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
});

//Delete specific day
router.delete(specificDayPath, function(req, res, next) {
    User.findOne({ _id: req.params.profileId })
    .populate({ path: 'days', match: { $eq: req.params.dayId }})
    .exec()
    .then(user => {
            if(user == null) {
                return res.status(404).json({ message: "User not found" })
            }
            if(user.days.length === 0) {
                return res.status(404).json({ message: "Day not found" })
            }
            user.days.pull({ _id: req.params.dayId });
            user.save();

            Day.findOneAndDelete({ _id: req.params.dayId })
            .then(day => {
                var dayName = day.name;
                return res.status(200).send({
                    message: "The day has been deleted",
                    dayName: dayName,
                    links: {
                        rel: "self",
                        type: "POST",
                        url: 'http://localhost:3000/api/profiles' + user._id + '/days'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            }); 
        });
    });

module.exports = router; 