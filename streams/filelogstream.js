var Stream = require('stream'),
  util = require('util'),
  fs = require('fs');

var FileLogStream = function(filepath, opts) {
  opts = opts || {};

  this._fileStream = fs.createWriteStream(filepath, opts);
  this.readable = true;
  this.writable = true;

  var fileWrite, formatLog;
  if(typeof opts.formatLog === 'function') {
    formatLog = opts.formatLog;
    fileWrite = this._fileStream.write;
    this._fileStream.write = function(data) {
      data = formatLog(data);
      return fileWrite.call(this, data);
    };
  }

  this.on('pipe', function(readStream) {
    readStream.pipe(this._fileStream);
  });
};
util.inherits(FileLogStream, Stream);
FileLogStream.prototype.write = function(data) {
  this.emit('data', data);
  return true;
};
FileLogStream.prototype.end = function(data) {
  if(data) { this.write(data); }

  this._fileStream.end();
  this.emit('end');
};

module.exports = FileLogStream;
