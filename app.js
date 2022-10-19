var express = require('express');
const { faker } = require('@faker-js/faker'); 
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+ "/public"));

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	database : 'join_us',
});

/* The entries of 500 users has been made using below code for only once */

// var data =[];
// for(i =0 ; i<500; i++){
// 	data.push([
// 		faker.internet.email(),
// 		faker.date.past()
// 	])	
// }
// var q = 'Insert into users(email,created_at) values?';
// connection.query(q,[data],function(err,result){
// 	console.log(err);
// 	console.log(result);
// });

app.get('/',function(req,res){
	var q = "select count(*) as count from users";
	connection.query(q, function(err,results){
		if (err){throw err};
		console.log(err);
		var count = results[0].count;
		// res.send("The Number of members in the DB is "+count+" people");
		res.render("Home",{data :count});
	});
});

app.post('/register',function(req,res){
	var person = {
		email : req.body.email
	};
	connection.query('Insert into users SET?',person,function(err,result){
		if (err) throw err;
		res.redirect('/');
	});
});


app.get('/hello',function(req,res){
		res.send("Hello!! you have reached my second page");
		}
	   );
	   
app.listen(3000,function(){
	console.log('App listening on the port');
});
