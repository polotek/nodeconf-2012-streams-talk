var Stream = require('stream'),
  fs = require('fs'),
  http = require('http');

http.createServer(function(request, response) {
  fs.createReadStream('./large-file.txt').pipe(response);
}).listen(8080);
