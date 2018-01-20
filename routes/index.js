var express = require('express');
var router = express.Router();
var noble = require('noble');

noble.state = "poweredOn";
noble.startScanning();

module.exports = router;
