var express = require('express');
var app = express();

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

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
