
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose= require('mongoose');
var db = mongoose.connect('mongodb://localhost/test1');
var Schema = mongoose.Schema
var app = module.exports = express.createServer();
mongoose.connection.on("open", function(){
  console.log("mongodb is connected")}
);
// Configuration
var MessageSchema = new Schema({
    name      : { type: String, required: true, trim: true }
  , message       : { type: String, required: true, trim: true }});

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(require('stylus').middleware({ src: __dirname + '/public' }));//just for later
	app.use(app.router);//just for later
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
});

// Routes

app.get('/', function(req, res){
	res.render('index', {
		title: 'Home'
	});
});

app.post('/posted_data', function(req, res){
	console.log(req.body);      // your JSON
	var Message = mongoose.model('Message', MessageSchema);
	var message= new Message(req.body)
	message.save( function (err) {
	if (err)
		return;
//	console.log('Saved');
	Message.find(
			{},
			function(err, mmm)
			{
				if (!err)
				{ 
					console.log(mmm);
					res.send(mmm);    // echo the result back
				}
				else { throw err;}
			}
	);
});});

if (!module.parent) {
  app.listen(8000);
  console.log("Express server listening on port 8000");
}
