var express = require('express');
const Day = require('../models/day');

const dayPath = '/api/profiles/:profileId/weeklycalenders/:weeklycalenderId/days';
const specificDayPath = '/api/profiles/:profileId/weeklycalenders/:weeklycalenderId/days/:dayId';

var router = express.Router();

//Create day
router.post(dayPath, function(req, res, next) {
    var day = new Day(req.body);
    day.save(function(err, day) {
        if(err) {return next(err); }
        res.status(201).json(day);
    })
});

//Get all days
router.get(dayPath, function(req, res, next) {
    Day.find(function(err, days) {
        if(err) { return next(err); }
        res.json({ 'days': days });
    });
});

module.exports = router; 