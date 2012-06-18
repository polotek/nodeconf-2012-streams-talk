var Stream = require('stream').Stream,
  util = require('util'),
  spawn = require('child_process').spawn;

var GZipStream = function() {
  this.readable = true;
  this.writable = true;

  this._gzipper = spawn('gzip');
  this._gzipper.stdout.on('data', this.emit.bind(this, 'data'));
  this._gzipper.on('exit', this.emit.bind(this, 'end'));
};
util.inherits(GZipStream, Stream);
GZipStream.prototype.write = function(data) {
  if(this._gzipper.stdin.writable) {
    this._gzipper.stdin.write(data);
  }
};
GZipStream.prototype.end = function(data) {
  this.readable = false;
  this.writable = false;

  this._gzipper.stdin.end();
  this._gzipper = null;
};

module.exports = GZipStream;
