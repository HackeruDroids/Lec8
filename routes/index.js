var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//db
// router.get('/initdb', function(req, res){
//     var SQL = 'CREATE TABLE IF NOT EXISTS Students(id SERIAL UNIQUE, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL);';
//     query(SQL, res, function(dbjson){
//       res.render('index', {title:'db created succeesfully'/*, data:dbjson*/})  ;
//     })
// });


router.get('/students', function (req, res) {
  var sql = "SELECT * FROM Students";
  query(sql, [], res, function (json) {
    res.render('students', {
      title: "Students Page",
      students: json.rows
    });
  });
});


router.get('/addstudent', function (req, res) {
  res.render('addstudent', {
    title: 'Add Student'
  });
});

router.get('/updateStudent', function (req, res) {
  var id = req.query.id;
  var sql = "SELECT * FROM Students WHERE id = $1;"
  query(sql, [id], res, function (json) {
    res.render('updateStudent', {
      title: "Update Student",
      student: json.rows[0]
    });
  });
});


router.post('/updateStudent', function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var id = req.body.id;

  var student = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    id: id
  }
  var SQL = 'UPDATE Students SET firstName = $1, lastName = $2, email = $3 WHERE id = $4';
  query(SQL, [firstName, lastName, email, id], res, function (json) {
    res.render('updateStudent', {
      title: 'Added succeesfully',
      student: student
    });
  });
});


router.post('/addstudent', function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var SQL = 'INSERT INTO Students(firstName, lastName, email) VALUES($1, $2, $3)';
  query(SQL, [firstName, lastName, email], res, function (json) {
    res.render('addstudent', {
      title: 'Added succeesfully'
    });
  });
});


function query(sql, arr, hbsResponse, listener) {

  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return hbsResponse.render('error', {
        error: err,
        message: err.message
      });
    }

    client.query(sql, arr, function (err, result) {
      done(); //close the connection
      if (err) {
        return hbsResponse.render('error', {
          error: err,
          message: err.message
        });
      }

      listener(result);
    });
  });
}

module.exports = router;