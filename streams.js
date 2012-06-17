var Stream = require('stream'),
  fs = require('fs'),
  http = require('http'),
  GZipStream = require('./gzipstream'),
  Collector = require('./collector');

http.createServer(function(request, response) {
  var gzipper = new GZipStream(),
      collector = new Collector();

  fs.createReadStream('./large-file.txt')
    .pipe(gzipper)
    .pipe(collector);

  collector.on('end', function() {
    response.writeHead(200, {
      'Content-Encoding': 'gzip',
      'Content-Type': 'text/plain',
      'Content-Length': collector.getBytesWritten()
    });
    response.end(collector.getData());
  });
}).listen(8080);

console.log('Server listening on port 8080\n');
