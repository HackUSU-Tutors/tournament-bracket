var express = require('express');
var app = express();
var port = 8080;

app.get('/', function (req, res) {
	res.send('hello world');
});

app.listen(port, () => {console.log(`App Runing on Port ${port}`);});
