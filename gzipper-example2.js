var fs = require('fs')
  , http = require('http')
  , formidable = require('formidable')
  , GZipStream = require('./streams/gzipstream');

http.createServer(function(request, response) {
  if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.onPart = function(part) {

      // gzip the uploaded data and write to disk
      var zippedFile = fs.createWriteStream('./files/large-file.zip')
        , gzipper = new GZipStream();
      part.pipe(gzipper).pipe(zippedFile);

    }
    form.on('end', function() {
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.end('We got the junk you uploaded. Thanks.');
    });
    return form.parse(request);
  }

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  fs.createReadStream('./upload-example-form.html').pipe(response);
}).listen(8080);

console.log('Server ' + process.pid + ' listening on port 8080\n');
