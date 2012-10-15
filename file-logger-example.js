var Stream = require('stream'),
    FileLogStream = require('./streams/filelogstream');

var format = function(d) {
      return 'log: ' + d + '\n';
    };

var logger = new FileLogStream('./log.txt', { formatLog: format });

var s = new Stream();
s.pipe(logger);
s.emit('data', 'message 1');
s.emit('data', 'message 2');
s.emit('data', 'message 3');
s.emit('end');
