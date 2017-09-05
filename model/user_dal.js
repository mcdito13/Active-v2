var pg = require('pg');

var DATABASE_URL = 'postgres://wqxbnvwfvwxrof:15bc84d34935b111e1bd25d1954189b9c0fb83c613a8123c107f26dd76bc724d@ec2-184-72-230-93.compute-1.amazonaws.com:5432/ddjdhei0lrfaq4';
var client = new pg.Client(DATABASE_URL);
client.connect();
pg.defaults.ssl = true;

// test model function will get from db
exports.checkIfUserExists = function(params, callback) {
    var query = "SELECT * FROM user_table WHERE email = lower('"+params.email+"') AND password = crypt('"+params.password+"', password);";
    console.log(params.email + ' ' + params.password);
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getUserById = function(params, callback) {
    var query = "SELECT * FROM user_table WHERE id = '"+params.userId+"';";
    console.log(params.userId);
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = "INSERT INTO user_table (first_name, last_name, email, password) VALUES ('"+params.firstName+"', '"+params.lastName+"', '"+params.email+"', crypt('"+params.password+"', gen_salt('bf', 8)));";
    console.log(params);
    console.log(query);
    client.query(query, function(err, result) {
        callback(err, result);
    });
};
