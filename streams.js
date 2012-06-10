var Stream = require('stream'),
  fs = require('fs'),
  http = require('http'),
  LogStream = require('./logstream');

http.createServer(function(request, response) {
  var logstream = new LogStream();
  fs.createReadStream('./large-file.txt').pipe(logstream).pipe(response);
}).listen(8080);

console.log('Server listening on port 8080\n');
