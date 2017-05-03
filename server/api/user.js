var express = require('express');
var router = express.Router();
var Model = require('../model/model');

router.route('/login')
  .post(function (req, res, next) {
    if (req.body.username && req.body.password) {
      Model.userlog(req.body, function (err, result) {
        if (err) {
          return res.json(result)
        } else {
          res.json({
            result: result
          })
        }
      })
    } else {
      res.json({
        result: 'bad',
        session: 'da'
      })
    }
  })

router.route('/signup')
  .post(function (req, res, next) {
    if (req.body.username && req.body.password && req.body.email) {
      Model.userreg(req.body, function (err, result) {
        if (err) {
          return res.json(result)
        } else {
          req.session.username = req.body.username;
          res.json({
            result: result
          })
        }
      })
    } else {
      res.json({
        code: -1
      })
    }
  });

module.exports = router;
