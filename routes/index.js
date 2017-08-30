var express = require('express');
var router = express.Router();

var pg = require('pg');
pg.defaults.ssl = true;

var DB_URL = 'postgres://cgocavixzphxyc:7f4d866a006cd43983c945d8f70090fb3fc2e13351c4df3567d236f0ba0ed5af@ec2-54-83-48-188.compute-1.amazonaws.com:5432/df5vlfg2ldn3e';

// GET home page
router.get('/', function(req, res, next) {

    pg.connect(DB_URL, function(err, client) {
        if (err) throw err;
        console.log('Connected to postgres! Getting schemas...');

        client
            .query('SELECT * FROM public.user_table;')
            .on('row', function(row) {
                console.log(JSON.stringify(row));
            });
    });

  res.render('index', { title: 'Active' });
});



module.exports = router;
