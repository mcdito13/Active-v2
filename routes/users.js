var express = require('express');
var router = express.Router();
//var user_dal = require('../model/user_dal');


// GET users listing.
router.get('/', function(req, res, next) {
    res.render('users', { name: 'Name' });
});

/*
// GET users listing.
router.get('/', function(req, res) {
    user_dal.testQuery(function(error, result) {
        if(err) {
            res.send(err);
        } else {
            res.render('users', { 'result': result});
        }
    });
});
*/

module.exports = router;
