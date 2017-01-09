var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//db
router.get('/initdb', function(req, res){
  pg.connect(process.env.DATABASE_URL, function(err, client, done){
    if(err){
      return res.render('error', {error:err, message:err.message});
    }
    var SQL = 'CREATE TABLE IF NOT EXISTS Students(id SERIAL UNIQUE, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL);';
    client.query(SQL,function(err, result){
      done();
      if(err){
        return res.render('error', {error:err, message:err.message});
      }
      res.render('index', {title:'db created'});
    });
  });
});
 
module.exports = router;
