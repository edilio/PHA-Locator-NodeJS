
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index',
      {
          title: 'Hello Nodejs',
          services: ['recarga moviles','check saldo','free sms','eseeese']
      }
  );
};