var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');

// pageMissing function
function pageMissing(respond) {
  respond.status(404) + '.' + respond.send('Not Found');
 };

// Use Markdown via Marked
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
console.log(marked('I am using __markdown__.'));

// Homepage
app.get('/', function (req, res) {
  res.send('I am the homepage');
});

// Definititon Pages
app.get('/definitions/:def_id', function(req, res) {
  var def_id = req.params.def_id;
  var path = __dirname + '/definitions/' + def_id + '.md';
  var file = fs.readFile(path, function(err, data) {
    if (err) {
      pageMissing(res)
    }
    if (data) {
      return res.send(marked(data.toString()));
    }
  });
});

// 404
app.use(function(req, res, next) {
  pageMissing(res);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
