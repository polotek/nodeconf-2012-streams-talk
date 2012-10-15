var Stream = require('stream').Stream
  , util = require('util');

var Collector = function() {
  this._bytesWritten = 0;
  this._data = null;
  this.readable = true;
  this.writable = true;
};
util.inherits(Collector, Stream);
Collector.prototype.write = function(data) {
  if(typeof data == 'string') {
    if(!this._data) { this._data = ''; }
    this._data += data.toString();
    this._bytesWritten += Buffer.byteLength(data);
  } else {
    // Buffer
    if(!this._data) { this._data = []; }
    this._data.push(data);
    this._bytesWritten += data.length;
  }

  this.emit('data', data);
};
Collector.prototype.end = function(data) {
  if(data) { this.write(data); }

  this.readable = false;
  this.writable = false;

  this.getData();
  this.emit('end');
};
Collector.prototype.getData = function() {
  if(this.writable) {
    throw new Error('Cannot get data before the end of the stream');
  }

  if(Array.isArray(this._data)) {
    this._data = Buffer.concat(this._data, this.getBytesWritten());
  }

  return this._data;
};
Collector.prototype.getBytesWritten = function() {
  return this._bytesWritten;
};
module.exports = Collector;
