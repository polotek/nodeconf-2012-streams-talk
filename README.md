For my NodeConf 2012 talk, I put together some simple custom streams to
show the power of the Stream API.

## Custom Streams

### Collector

A stream that collects data into memory. The data can be retrieved along
with the number of bytes written. It is a read-write stream, so data
will also be passed through.


### LogStream

A stream that simply logs any data input to the console. It is a read-
write stream, so data will also be passed through.


### FileLogStream

A stream that takes a file path and logs any data input to that file. It
is a read-write stream, so data will also be passed through.

### GZipStream

A stream that runs incoming data through the gzip deflate algorithm and
outputs compressed data.
