var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
var port = 5000; 
const connectDB = require('./db');

connectDB()

app.use(express.json({ extended: false }));

app.get('/', function (req, res) {
	res.render('index', {name: 'Tournament'});
});

app.use('/auth/login', require('./auth/login'));
app.use('/auth/signup', require('./auth/signup'));


app.listen(port, () => {console.log(`App Runing on Port ${port}`);});
