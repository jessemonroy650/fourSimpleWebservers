/*
 *
 *
**/
serialDefaultLibrary = 'serialport';

serialDefaultPort = "/dev/ttyUSB0";
serialDefaultBaud = 57600
serialDefaultDataBits = 8;
serialDefaultStopBits = 1;
serialDefaultParity   = 'none';
serialDefaultBufferSize = 255;
serialDefaultParser = serialport.parsers.raw; 

var SerialPort = require(serialDefaultLibrary).SerialPort

var serialPort = new SerialPort(serialDefaultPort, {
  baudrate: serialDefaultBaud,
  databits: serialDefaultDataBits,
  stopbits: serialDefaultStopBits,
  parity: serialDefaultParity,
  buffersize: serialDefaultBufferSize,
  parser: serialDefaultParser
}, false); // this is the openImmediately flag [default is true]

//
//
//
serialPort.on('error', function(err) {
    console.log("genric error:" + err);
});


serialPort.on('data', function(data) {
    console.log("data:" + data);
});

//
// NOTE: The write operation is non-blocking.
//
serialPort.write(buffer, function(err){
    this.drain(function(err) {
        console.log("drain error:" + err);
    });
    console.log("write error:" + err);
});




