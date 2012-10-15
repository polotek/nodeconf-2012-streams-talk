var Stream = require('stream'),
  fs = require('fs'),
  http = require('http'),
  GZipStream = require('./streams/gzipstream');

http.createServer(function(request, response) {
  var gzipper = new GZipStream();

  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Encoding', 'gzip');

  fs.createReadStream('./large-file.txt')
    .pipe(gzipper)
    .pipe(response);

}).listen(8080);

console.log('Server listening on port 8080\n');
