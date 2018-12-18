var express = require('express');
var router = express.Router();
var connection = require('../db');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
	connection.query(`SELECT * from courses LIMIT 3;
		SELECT * FROM courses LIMIT 3,1;
		SELECT * FROM courses LIMIT 4,3;
		SELECT * FROM courses LIMIT 7,3;
		SELECT * FROM courses LIMIT 10,2; 
		SELECT * FROM tutors_site;
		SELECT * FROM tutors_and_courses`,
		[1,2,3,4,5,6,7],function(error,results,fields){
		if(error) throw error

		let groupedTutors = _.groupBy(results[6],'idtutors'),
			tutors = [];

		_.each(groupedTutors, (val) => {
			val[0].directions = ''

			_.each(val, (v) => {
				val[0].directions += ` ${v.direction},`
			})

			val[0].directions = val[0].directions.slice(0,-1)
			tutors.push(val[0])
		})

  		res.render('index', {
  		 	results,
  		 	tutors
  		});
	});
});
// router.get('/', function(req, res, next) {
// for(var i=1; i<21; i++) {
//   connection.query("CALL go_fuck() WHERE id_tutors=1;", [i],
//   function(error,results,fields){
//     console.log(results);
//     if(error) throw error
//       res.render('index', {
//        results 
//       });
//   });
// };
// });


router.get('/', function(req, res, next) {
for(var i=1; i<21; i++) {
  connection.query("CALL go_info(?);", [i],
  function(error,results,fields){
    console.log('test',results);
    if(error) throw error
      res.render('index', {
       results 
      });
  });
};
});

// router.get('/', function(req, res, next) {
// 	connection.query (
// 		for(var i=1; i<21; i++){
// 			'CALL go_fuck(i)';
// 		}
// 		,function(error,results,fields){
// 		console.log(results);
// 		if(error) throw error
//   		res.render('index', {
//   		 results 
//   		});
// 	});
// });

router.post("/registeruser", function (req, res, next) {
	connection.query("CALL Students_INSERT(?,?,?,?,?);", 
  // connection.query("INSERT INTO students(name, surname, email, tel, direction) VALUES(?,?,?,?,?);", 
    [name = req.param("studentname"),
    surname = req.param("studentsurname"),
    email = req.param("studentemail"),
    tel = req.param("studenttel"),
   direction = req.param("studentdirection")], function(error, results, fields) {
    console.log(tel);
    if (error) {
    return console.error(error.message);
      }
    console.log('Add to BD ');
    res.redirect("/");
  })
});
module.exports = router;