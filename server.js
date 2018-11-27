var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var conn = require('mysql');
app.use(express.static(__dirname));
app.use(bodyParser.json());

var pool = conn.createPool({
	connectionLimit: 2000,
	database: 'socio',
	host: 'enwys.com',
	user: 'ebs',
	password: 'ebs1234',
	debug: false,
	multipleStatements: true,
	connectTimeout: 60000, 
	acquireTimeout: 60000
})

app.post('/db_data', function(req, res){
	console.log(req.body);
	pool.query('call '+req.body.proc+"(?)",JSON.stringify(req.body.trans),function(err, docs){
		var output = {};
		if (err){
			console.log(err);
			output = {error: err, data: ''};
			res.send(output);
		}
		else{
			output = {error: 'None', data: docs};
			res.send(output);
		}
	})
})

app.all('*',(req, res) => {
	res.sendFile(__dirname + '/src/index.html');
});

app.listen(9300);
console.log('Server started on port 9300');