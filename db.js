var mysql = require ('mysql');

var connection = mysql.createPool({
	multipleStatements: true,
	connectionLimit:10,
	host:'lightos.beget.tech',
	user:	'lightos_vika',
	password:'43PTpA*w',
	database:'lightos_vika'

});

module.exports = connection;

