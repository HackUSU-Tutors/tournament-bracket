var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
var port = 8080;

app.get('/', function (req, res) {
	res.render('index', {name: 'Tournament'});
});

app.listen(port, () => {console.log(`App Runing on Port ${port}`);});
