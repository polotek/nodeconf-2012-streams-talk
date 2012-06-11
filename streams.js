var Stream = require('stream'),
  fs = require('fs'),
  http = require('http'),
  GZipStream = require('./gzipstream');

http.createServer(function(request, response) {
  var gzipstream = new GZipStream();

  response.setHeader('Content-Type', 'text/plain');
  response.setHeader('Content-Encoding', 'gzip');

  fs.createReadStream('./large-file.txt')
    .pipe(gzipstream)
    .pipe(response);
}).listen(8080);

console.log('Server listening on port 8080\n');
