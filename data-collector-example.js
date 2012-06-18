var Stream = require('stream'),
  fs = require('fs'),
  http = require('http'),
  Collector = require('./collector');

http.createServer(function(request, response) {
  var collector = new Collector();
  fs.createReadStream('./large-file.txt').pipe(collector);
  collector.on('end', function() {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Content-Length': collector.getBytesWritten()
    });
    response.end(collector.getData());
  });
}).listen(8080);

console.log('Server listening on port 8080\n');
