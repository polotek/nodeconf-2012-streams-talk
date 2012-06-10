var Stream = require('stream').Stream
  , util = require('util');

var Collector = function() {
  this._bytesWritten = 0;
  this._data = '';
  this.readable = true;
  this.writable = true;
};
util.inherits(Collector, Stream);
Collector.prototype.write = function(data) {
  if(typeof data == 'string') {
    this._bytesWritten += Buffer.byteLength(data);
  } else {
    this._bytesWritten += data.length;
  }

  this._data += data.toString();

  this.emit('data', data);
};
Collector.prototype.end = function(data) {
  if(data) { this.write(data); }

  this.readable = false;
  this.writable = false;
  this.emit('end');
};
Collector.prototype.getData = function() {
  return this._data;
};
Collector.prototype.getBytesWritten = function() {
  return this._bytesWritten;
};
module.exports = Collector;
