var express = require('express');
var router = express.Router();
var async = require('async');
var Estimote = require('bleacon').Estimote;
var async = require('async');
var querystring = require('querystring');
var http = require("http");
var fs = require("fs");

var beacons_in_range = {};

Estimote.discoverAll(function(estimote) {
  async.series([
    function(callback) {
			if (beacons_in_range.hasOwnProperty(estimote.uuid) && new Date().getTime() - beacons_in_range[estimote.uuid].delta < 10000) return;
			console.log('found: ' + estimote.toString());
      var data = querystring.stringify({
	      'id_': estimote.uuid,
	      'beaconID': 'demo_desk_0'
      });
      var post_options = {
	      host: 'strada-traffic.herokuapp.com',
	      path: '/checkIn',
	      method: 'POST',
	      headers: {
		      'Content-Type': 'application/x-www-form-urlencoded',
		      'Content-Length': Buffer.byteLength(data)
	      }
      };

      var post_req = http.request(post_options, function(res) {
				beacons_in_range[estimote.uuid] = estimote;
				beacons_in_range[estimote.uuid].delta = new Date().getTime();
	      res.setEncoding('utf8');
	      res.on('data', function(chunk) {
		      console.log('Response: ' + chunk);
	      });
      });
      post_req.write(data);
      return post_req.end();
    }
  ]);
});


module.exports = router;
