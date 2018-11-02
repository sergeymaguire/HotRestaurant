
var express = require('express'),
 bodyParser = require('body-parser'),
 path = require('path');


var app = express();
var PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

app.get('/tables', function (req, res) {
  res.sendFile(path.join(__dirname, 'app/public/tables.html'));
});

app.get('/reserve', function (req, res) {
  res.sendFile(path.join(__dirname, 'app/public/reserve.html'));
});



var tables = [
  ];

app.get('/api/tables', function (req, res) {
  res.json(tables);
});


app.post('/api/reserve', function (req, res) {

  var newReservation = req.body;

  tables.push(newReservation);

  var isBooked;
  if(tables.length <= 5){
    isBooked = true;
  }
  else{
    isBooked = false;
  }

  res.json(isBooked);

});


app.post('/api/clear', function (req, res) {
  console.log('clear all tables');
  tables = [];
  res.sendFile(path.join(__dirname, 'app/public/tables.html'));
});

app.post('/api/killreservation', function (req, res) {
  console.log(req.body.id);
  tables.splice(req.body.id, 1);
  res.json(tables);
});


function nodeServer() {
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
})
};
nodeServer();