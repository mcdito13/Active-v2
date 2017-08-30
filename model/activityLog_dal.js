var pg = require('pg');

var DATABASE_URL = 'postgres://wqxbnvwfvwxrof:15bc84d34935b111e1bd25d1954189b9c0fb83c613a8123c107f26dd76bc724d@ec2-184-72-230-93.compute-1.amazonaws.com:5432/ddjdhei0lrfaq4';
var client = new pg.Client(DATABASE_URL);
client.connect();
pg.defaults.ssl = true;

exports.getByEmail = function(params, callback) {
    var query = "SELECT a.name, al.date_done FROM activity_log_table al JOIN activity_table a ON a.id = al.id JOIN user_table u ON u.email = '"+params.email+"';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};
