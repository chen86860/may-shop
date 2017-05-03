var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.redirect('/public/index.html');
  res.send("Hello world");
});

module.exports = router;
