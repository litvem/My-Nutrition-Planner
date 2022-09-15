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

module.exports = router; 