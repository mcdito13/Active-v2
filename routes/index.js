var express = require('express');
var router = express.Router();

var pg = require('pg');
pg.defaults.ssl = true;

var DATABASE_URL = 'postgres://wqxbnvwfvwxrof:15bc84d34935b111e1bd25d1954189b9c0fb83c613a8123c107f26dd76bc724d@ec2-184-72-230-93.compute-1.amazonaws.com:5432/ddjdhei0lrfaq4';

// GET home page
router.get('/', function(req, res, next) {

    pg.connect(DATABASE_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres!');
    });

  res.render('index', { title: 'Active' });
});



module.exports = router;
