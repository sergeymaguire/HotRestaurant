
var express = require('express'),
 bodyParser = require('body-parser'),
 path = require('path');


var app = express();
var PORT = process.env.PORT || 3000;


ParseJSONWithNPMBodyParser();



GetReservationsAndTables();



var tablesOfReservations = [
  ];

app.get('/api/tables', function (req, res) {
  res.json(tables);
});


const SeeIfBooked = BookLimitIsFive();


DeleteReservations();


function ParseJSONWithNPMBodyParser() {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
}

function BookLimitIsFive() {
  return app.post('/api/reserve', function (req, res) {
    var newReservation = req.body;
    tablesOfReservations.push(newReservation);
    var isBooked;
    if (tablesOfReservations.length <= 5) {
      isBooked = true;
    }
    else {
      isBooked = false;
    }
    res.json(isBooked);
  });
}

function DeleteReservations() {
  app.post('/api/clear', function (req, res) {
    tablesOfReservations = [];
    res.sendFile(path.join(__dirname, 'app/public/tables.html'));
  });
  app.post('/api/killreservation', function (req, res) {
    tables.splice(req.body.id, 1);
    res.json(tables);
  });
}

function GetReservationsAndTables() {
  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/index.html'));
  });
  app.get('/tables', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/tables.html'));
  });
  app.get('/reserve', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/public/reserve.html'));
  });
}

function nodeServer() {
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
})
};
nodeServer();