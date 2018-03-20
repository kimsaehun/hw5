var http = require('http');
var fs = require('fs');
var extract = require('./extract');
const mime = require('mime');

var handleError = function(err, res) {
  fs.readFile('app/error.html', function(err, data) {
    res.writeHead(404);
    res.end(data);
  });
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    res.setHeader('Content-Type', mime.getType(filePath));
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);