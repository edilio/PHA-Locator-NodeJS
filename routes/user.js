
/*
 * GET users listing.
 */


var mysql =  require('mysql');

var connection =  mysql.createConnection({
    host : "127.0.0.1",
    user : "root",
    password: ""
});


var server_connection =  mysql.createConnection({
    host : "10.0.0.9",
    user : "root",
    password: "whatever"
});

server_connection.connect();


exports.list = function(req, res){
  var result = {
      "test":1,
      "hello": "world"
  };
  res.jsonp(result);
};



function listAllCreator(table, cnn, db){
    return function (req, res){
        var start = req.query.start || 0,
            limit = req.query.limit || 50;
        console.log(start);
        cnn.query('SELECT * from ' + db + '.' + table + ' limit ' + start + ', ' + limit, function(err, rows, fields) {
            if (err){
                res.jsonp({
                    'error': err
                });
            }
            else{
                res.jsonp(rows);
            }
        });
    }
}


exports.emails = listAllCreator('auth_user', connection, 'cubabb');
exports.provinces = listAllCreator('bb_province', connection, 'cubabb');
exports.logs = listAllCreator('django_admin_log', connection, 'cubabb');
exports.muni = listAllCreator('bb_Municipality', connection, 'cubabb' );
exports.phas = listAllCreator('pha',server_connection, 'pha_locator');

