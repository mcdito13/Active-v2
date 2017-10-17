var express = require('express');
var router = express.Router();
var activityLog_dal = require('../model/activityLog_dal');
var goals_dal = require('../model/goals_dal');
var user_dal = require('../model/user_dal');
var activity_dal = require('../model/activity_dal');

// GET users listing.
router.get('/', function(req, res) {
    console.log('user info: ');
    console.log(req.query);
    activityLog_dal.getByEmail(req.query, function(err, result) {
        console.log('User activities:');
        console.log(result);
        if(err) {
            res.send(err);
        } else {
            goals_dal.getByEmail(req.query, function(err,result) {
                console.log('User goals:');
                console.log(result);
                if(err) {
                    res.send(err);
                } else {
                    res.render('users', {
                        'result': result.rows,
                        'rowCount': result.rowCount
                    });
                }
            });
        }
    });
});


router.get('/view', function(req, res) {
    // First check to see if the user exists
    user_dal.checkIfUserExists(req.query, function (err, user_info_result) {
        console.log('Checking if user exists...');
        console.log(user_info_result.rows);
        if (err) {
            res.send(err);
        } else {
            // they do not exist, stop
            if (user_info_result.rowCount === 0) {
                console.log("User does not exist or email/password incorrect");
                res.render('index', {unsuccessful: true});
            } else {
                // they do exist, get their activities
                var json = JSON.stringify(user_info_result.rows);
                var userJSONObject = JSON.parse(json);
                activityLog_dal.getById(userJSONObject[0], function (err, user_activity_result) {
                    console.log("User activity:");
                    console.log(user_activity_result.rows);
                    if (err) {
                        res.send(err);
                    } else {
                        // now get their goals
                        goals_dal.getById(userJSONObject[0], function (err, goal_result) {
                            console.log('User Goals:');
                            console.log(goal_result);
                            if (err) {
                                res.send(err);
                            } else {
                                // now get all types of activities in-case they want to log one
                                activity_dal.getWeights(function (err, weights_list) {
                                    console.log('all weights list...');
                                    console.log(weights_list.rows);
                                    if (err) {
                                        res.send(err);
                                    } else {
                                        activity_dal.getCardio(function (err, cardio_list) {
                                            console.log('all cardio list...');
                                            console.log(cardio_list.rows);
                                            if (err) {
                                                res.send(err);
                                            } else {
                                                res.render('users', {
                                                    'user_info_result': user_info_result.rows,
                                                    'user_activity_result': user_activity_result.rows,
                                                    'goal_result': goal_result.rows,
                                                    'weights_list': weights_list.rows,
                                                    'cardio_list': cardio_list.rows
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});

module.exports = router;
