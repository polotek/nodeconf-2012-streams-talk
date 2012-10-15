var Stream = require('stream').Stream,
  util = require('util'),
  spawn = require('child_process').spawn;

var GZipStream = function() {
  // readable stream
  this.readable = true;
  // writable stream
  this.writable = true;

  this._gzipper = spawn('gzip');
  // emit data at some point
  this._gzipper.stdout.on('data', this.emit.bind(this, 'data'));
  // emit end at some point
  this._gzipper.on('exit', this.emit.bind(this, 'end'));
};

// this is a custom stream object
util.inherits(GZipStream, Stream);

// implement write, process some data
GZipStream.prototype.write = function(data) {
  if(this._gzipper.stdin.writable) {
    this._gzipper.stdin.write(data);
  }
};

// implement end
GZipStream.prototype.end = function(data) {
  // shut down processing
  this.readable = false;
  this.writable = false;

  // clean up
  this._gzipper.stdin.end();
  this._gzipper = null;
};

module.exports = GZipStream;
