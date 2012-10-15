var fs = require('fs')
  , http = require('http')
  , formidable = require('formidable')
  , forHumans = require('./for-humans.js');

http.createServer(function(request, response) {
  if (request.url == '/upload' && request.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.onPart = function(part) {

      // the part is a stream of the incoming upload
      var data = '';
      part.on('data', function(chunk) {
        data += chunk;
      });
      part.on('end', function() {
        fs.writeFile('./files/test.json', data);
      });

    }
    form.on('end', function() {
      console.log('mem: ', forHumans(process.memoryUsage().rss));
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.end('We got the junk you uploaded. Thanks.');
    });
    return form.parse(request);
  }

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  fs.createReadStream('./upload-example-form.html').pipe(response);
}).listen(8080);

console.log('Server ' + process.pid + ' listening on port 8080\n');
