var pg = require('pg');

var DATABASE_URL = 'postgres://wqxbnvwfvwxrof:15bc84d34935b111e1bd25d1954189b9c0fb83c613a8123c107f26dd76bc724d@ec2-184-72-230-93.compute-1.amazonaws.com:5432/ddjdhei0lrfaq4';
var client = new pg.Client(DATABASE_URL);
client.connect();
pg.defaults.ssl = true;

exports.getByEmail = function(params, callback) {
    var query = "SELECT a.name, al.date_done, al.id, al.details FROM activity_log_table al JOIN activity_table a ON a.id = al.activity_id JOIN user_table u ON u.email = '"+params.email+"';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = "INSERT INTO activity_log_table (user_id, activity_id, date_done, details) VALUES ('"+params.userId+"', '"+params.activityId+"', '"+params.dateDone+"', '"+params.activityDetails+"');";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.edit = function(params, callback) {
    var query = "UPDATE activity_log_table (user_id, activity_id, date_done, details) VALUES ('"+params.userId+"', '"+params.activityLogId+"', '"+params.dateDone+"', '"+params.activityDetails+"');";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.delete = function(params, callback) {
    var query = "DELETE FROM activity_log_table WHERE id = '"+params.activityLogToDelete+"';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};