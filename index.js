var express = require('express');
var cors = require('cors');
var app = express();
var fetchdata = require('./fetchdata');
var alld = require('./all');
var port = process.env.PORT || 1337;
var all = [];
var sym =require("./symb")
var fs = require("fs")
var path = require("path")
var ti=5*1000*1
async function upd() {
	console.log('updated');
	all = await alld(["ETHDAI","ETHUSD"])
	// setInterval(async () => {
	// 	console.log("update")
	// 	all = await alld(["ETHDAI","ETHUSD"])
	// 	sym([
	// 		'BTCDAI',
	// 		'ETHDAI',
	// 		'MKRDAI',
	// 		'EOSDAI',
	// 		'USDDAI',
	// 		'TUSDDAI',
	// 		'LTCDAI',
	// 		'XRPDAI',
	// 		'EURSDAI',
	// 		'DAIUSDC',
	// 		'DAIEOSDT',
	// 	])
	// }, ti);
}
app.get('/test/:id', cors(), function(req, res, next) {
	res.json({ msg: 'This is CORS-enabled for a Single Route', prams: req.params });
});
app.get('/btc', cors(), function(req, res, next) {
	let step1 = fetchdata();
	step1.then(d => {
		console.log(d);
		res.json(d);
	});
});
upd()
app.get('/sym', cors(), function(req, res, next) {
	let step1 = sym([
		'BTCDAI',
		'ETHDAI',
		'EOSDAI',
		'USDDAI',
		'TUSDDAI',
		'DAIUSDC',
		'DAIEOSDT',
	])
	step1.then(d => {
		console.log(d);
		res.json(d);
	});
});
app.get('/all', cors(), function(req, res, next) {
	res.json(all)
	//res.json({ msg: 'This is CORS-enabled for a Single Route', prams: req.params });
});
app.get('/sj', cors(), function(req, res, next) {
	let o = fs.readFileSync(path.join(__dirname,"sym.json"))
	res.json(o.toString())
	//res.json({ msg: 'This is CORS-enabled for a Single Route', prams: req.params });
});
app.listen(port, function() {
	console.log('CORS-enabled web server listening on port 80');
});
