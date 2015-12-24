var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost/ras');
var app = express();

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use(session({
    secret: "raweb2015",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id: {type: Number, required: true, unique: false},
	ras_name: {type: String, required: true, unique: false},
    password: {type: String, required: true, unique: false},
    dollars: {type: Number, required: true}
});
var User = mongoose.model("User", userSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connected to DB");
});

require("./routes/frontpage")(app);
require("./routes/login")(app, User);
require("./routes/phonepage")(app);