var express = require('express'),
	mongojs = require('mongojs'),
	db = mongojs('contacList', ['contacList']),
	bodyParser = require('body-parser'),
	app = express();

//static is basically saying look for static files in the 
//root dirctory name  + /public
//ex meanStack_contacList/public is how the directory is set up
app.use(express.static(__dirname + "/public"));
//the body parser Parses the data in the input for the server to consume
app.use(bodyParser.json());

//the server is serving the res to the /contactList route in the controller
//this is the response to the get request made by the controller
//!!!THINK this is always showing all the docs from the data base...
//when we post to the db (write to it), it just automatically shows up in the docs 

app.get('/contactList', function(req, res){
	console.log('I recieved a get request');

	//connecting to the contacList database that we created in mongo db
	db.contacList.find(function(err, docs){
		
		console.log(docs);

		//attaching the .json to the response ensures we are getting back a json object
		res.json(docs);
	});
});


//this post from the route  /contactList the body(the input) in the  the db
app.post('/contactList', function(req, res){
	//this console.log writes to the console the data we are posting
	console.log(req.body);
	//this actually inserts it into the database
	db.contacList.insert(req.body, function(err, docs){
		
		//this sends the object back to the controller
		res.json(docs);
	});
});

app.delete('/contactList/:id', function(req, res){
	//this will get the value from the id at that url
	var id = req.params.id;
	console.log(id);

	db.contacList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){

		//this sends the object back to the controller
		res.json(doc);
	});
});

app.get('/contactList/:id', function(req, res){
	//this will get the value from the id at that url
	var id = req.params.id;
	console.log(id);

	db.contacList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){

		//this sends the object back to the controller
		res.json(doc);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id; 
	console.log(req.body.name);
	db.contacList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		
	});
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
	console.log('I fucking hear Ya at http://localhost:' + app.get('port'));
});