
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



function listCreator(table, cnn, db){
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


var cache = {

};

function listAllCreator(table, cnn, db){
    return function (req, res){
        if (cache["table"] === undefined){
            cnn.query('SELECT * from ' + db + '.' + table, function(err, rows, fields) {
                if (err){
                    res.jsonp({
                        'error': err
                    });
                }
                else{
                    cache["table"] = rows;
                    res.jsonp(rows);
                }
            });
        }
        else{
            res.jsonp(cache["table"]);
        }
    }
}

exports.emails = listCreator('auth_user', connection, 'cubabb');
exports.provinces = listCreator('bb_province', connection, 'cubabb');
exports.logs = listCreator('django_admin_log', connection, 'cubabb');
exports.muni = listCreator('bb_Municipality', connection, 'cubabb' );
exports.phas = listCreator('phas_pha',server_connection, 'pha_locator');
exports.phas_all = listAllCreator('phas_pha',server_connection, 'pha_locator');

