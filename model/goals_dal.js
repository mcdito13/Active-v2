var pg = require('pg');

var DATABASE_URL = 'postgres://wqxbnvwfvwxrof:15bc84d34935b111e1bd25d1954189b9c0fb83c613a8123c107f26dd76bc724d@ec2-184-72-230-93.compute-1.amazonaws.com:5432/ddjdhei0lrfaq4';
var client = new pg.Client(DATABASE_URL);
client.connect();
pg.defaults.ssl = true;

exports.getById = function(params, callback) {
    var query = "SELECT g.name, a.name as a_name, g.id FROM goals_table g JOIN activity_table a ON a.id = g.activity_id WHERE g.user_id = '"+params.id+"';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = "INSERT INTO goals_table (user_id, name, activity_id) VALUES ('"+params.userId+"','"+params.goalName+"', '"+params.activityId+"');";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(params, callback) {
    var query = "DELETE FROM goals_table WHERE id = '"+params.goalToDelete+"';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};