var express = require('express');
var router = express.Router();
var async = require('async');
var Estimote = require('bleacon').Estimote;

var async = require('async');

var Estimote = require('./estimote.js');

Estimote.discover(function(estimote) {
  async.series([
    function(callback) {
      estimote.on('disconnect', function() {
        console.log('disconnected!');
        process.exit(0);
      });

      estimote.on('motionStateChange', function(isMoving) {
        console.log('\tmotion state change: isMoving = ' + isMoving);
      });

      console.log('found: ' + estimote.toString());

      console.log('connectAndSetUp');
      estimote.connectAndSetUp(callback);
    }
  ]);
});


module.exports = router;
