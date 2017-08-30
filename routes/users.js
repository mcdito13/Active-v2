var express = require('express');
var router = express.Router();
var activityLog_dal = require('../model/activityLog_dal');
var goals_dal = require('../model/goals_dal');
var user_dal = require('../model/user_dal');


/*
// GET users listing.

router.get('/', function(req, res, next) {
    res.render('users', { name: 'Name' });
});
 */

// GET users listing.
router.get('/', function(req, res) {
    activityLog_dal.getByEmail(function(err, result) {
        console.log(result);
        if(err) {
            res.send(err);
        } else {
            goals_dal.getByEmail(function(err,result) {
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
    user_dal.checkIfUserExists(req.query, function(err, result) {
        console.log(result);
        if(err) {
            res.send(err);
        } else {
            if(result.rowCount == 0) {
                console.log("user does not exist or email/password incorrect");
                res.render('index', { unsuccessful: true });
            } else {
                activityLog_dal.getByEmail(req.query, function(err, activity_result) {
                    console.log(activity_result);
                    if(err) {
                        res.send(err);
                    } else {
                        goals_dal.getByEmail(req.query, function(err,goal_result) {
                            console.log(result);
                            if(err) {
                                res.send(err);
                            } else {
                                res.render('users', {
                                    'activity_result': activity_result.rows,
                                    'goal_result': goal_result.rows
                                });
                            }
                        });
                    }
                });
            }
        }
    })
});



module.exports = router;
