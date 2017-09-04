var pg = require('pg');

var DATABASE_URL = 'postgres://wqxbnvwfvwxrof:15bc84d34935b111e1bd25d1954189b9c0fb83c613a8123c107f26dd76bc724d@ec2-184-72-230-93.compute-1.amazonaws.com:5432/ddjdhei0lrfaq4';
var client = new pg.Client(DATABASE_URL);
client.connect();
pg.defaults.ssl = true;

exports.getTypes = function(callback) {
    var query = "SELECT DISTINCT type FROM activity_table;";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getAll = function(callback) {
    var query = "SELECT * FROM activity_table;";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getWeights = function(callback) {
    var query = "SELECT * FROM activity_table WHERE type = 'Weights';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getCardio = function(callback) {
    var query = "SELECT * FROM activity_table WHERE type = 'Cardio';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getNamesForType = function(params, callback) {
    var query = "SELECT name FROM activity_table WHERE type = '"+params.activityType+"';";
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};
