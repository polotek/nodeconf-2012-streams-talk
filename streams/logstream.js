var Stream = require('stream'),
  util = require('util');

var LogStream = function() {
  this.readable = true;
  this.writable = true;
};
util.inherits(LogStream, Stream);
LogStream.prototype.write = function(data) {
  console.log('written: ' + data.toString());
  this.emit('data', data);
};
LogStream.prototype.end = function(data) {
  if(data) { this.write(data); }

  this.emit('end');
};

module.exports = LogStream;
