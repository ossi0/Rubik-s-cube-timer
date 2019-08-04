const http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var dat = require('./website/button.js');

var mydata = fs.readFileSync('mydata.json');
var myparsedata = JSON.parse(mydata);

var server = app.listen(3000, listening);

function listening() {
	console.log('Server is running and listening');
}

app.use(bodyParser.urlencoded({extended: true})); // TÄMÄ OTETTAVA HUOMIOON KUN KIRJOITETAAN DATAA TIEDOSTOON

app.post('/upload', upload);

function upload(req, res) {
	mydata = fs.readFileSync('mydata.json');
	myparsedata = JSON.parse(mydata);
	var solve = Object.keys(myparsedata.Stats).length + 1;
	myparsedata.Stats.push({"#": solve, "time": Number(req.body.number), "scramble": req.body.scramble});
	var data = JSON.stringify(myparsedata, null, 2);
	fs.writeFile('mydata.json', data, finished);
	console.log(myparsedata.Stats.length);
	function finished(err) {
		console.log('User has passed the following: ' + req.body.number);
		res.send('Data has been saved to mydata.json');
		res.end();
	}
}

app.post('/removelast', remove);

function remove(req, res) {
	mydata = fs.readFileSync('mydata.json');
	myparsedata = JSON.parse(mydata);
	if (Object.keys(myparsedata).length > 0) {
		myparsedata.Stats.splice((myparsedata.Stats.length-1), 1); // Postaa vielä edellisenkin session aikoja!
		console.log(myparsedata.Stats.length);
	}
	var data = JSON.stringify(myparsedata, null, 2);
	fs.writeFile('mydata.json', data, finished);
	function finished(err) {
		console.log("User has deleted the previous time");
	}
	res.end();
}

app.get('/getTimes', sendTimes);

function sendTimes(req, res) {
	res.send(myparsedata.Stats);
	res.end();
}

app.use(express.static('website'));

/*
const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	var myReadStream = fs.createReadStream(__dirname + '/hooteeml.html', 'utf8');
	myReadStream.pipe(res);
});
*/