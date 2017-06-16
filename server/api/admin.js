var express = require('express');
var router = express.Router();

var credentials = require('../lib/credentials');
var nodemailer = require('nodemailer');
var md5 = require('md5');
var uuid = require('uuid');
var ip = require('ip');
var Model = require('../model/model');

router.route('/doors/index')
  .post(function (req, res, next) {
    if (req.body && req.body.page && req.body.count) {
      Model.logIndex(req.body, (err, result) => {
        if (err) {
          res.json({
            code: 200,
            msg: result.msg
          })
        } else {
          res.json({
            code: 0,
            msg: result.msg
          })
        }
      })
    } else {
      res.json({
        code: 202,
        msg: 'param is no fixed'
      })
    }
  })
router.route('/doors/user')
  .post(function (req, res, next) {
    if (req.body) {
      Model.logUserIndex(req.body, (err, result) => {
        if (err) {
          res.json({
            code: 200,
            msg: result.msg
          })
        } else {
          res.json({
            code: 0,
            msg: result.msg
          })
        }
      })
    } else {
      res.json({
        code: 202,
        msg: 'param is no fixed'
      })
    }
  })
router.route('/users/index')
  .post(function (req, res, next) {
    if (req.body && req.body.page && req.body.count) {
      Model.userIndex(req.body, (err, result) => {
        if (err) {
          res.json({
            code: 200,
            msg: result.msg
          })
        } else {
          res.json({
            code: 0,
            msg: result.msg
          })
        }
      })
    } else {
      res.json({
        code: 202,
        msg: 'param is no fixed'
      })
    }

  })
router.route('/doors/count')
  .post(function (req, res, next) {
    if (req.body && req.body.type) {
      Model.logIndexCount(req.body, (err, result) => {
        if (err) {
          res.json({
            code: 200,
            msg: result.msg
          })
        } else {
          res.json({
            code: 0,
            msg: result.msg
          })
        }
      })
    } else {
      res.json({
        code: 202,
        msg: 'param is no fixed'
      })
    }
  })
router.route('/users/count')
  .post(function (req, res, next) {
    if (req.body && req.body.type) {
      Model.userIndexCount(req.body, (err, result) => {
        if (err) {
          res.json({
            code: 200,
            msg: result.msg
          })
        } else {
          res.json({
            code: 0,
            msg: result.msg
          })
        }
      })
    } else {
      res.json({
        code: 202,
        msg: 'param is no fixed'
      })
    }
  })
router.route('/userinfo')
  .get(function (req, res, next) {
    Model.logIndex((err, result) => {
      res.render('adminIndex', result)
    })
  })

router.route('/signup')
  .post(function (req, res, next) {
    if (req.body && req.body.username) {
      Model.adminReg(req.body, (err, result) => {
        if (err) {
          res.json({
            code: 201
          })
        } else if (result.code == 0) {
          res.json({
            code: 0,
            msg: result
          })
        } else {
          res.json({
            code: 201
          })
        }
      })
    }
    else {
      res.json({
        code: 201
      })
    }
  });


router.route('/login')
  .post(function (req, res, next) {
    if (req.body && req.body.username) {
      //查询数据
      Model.adminLogin(req.body, (err, result) => {
        if (err) {
          res.json({
            code: 201,
            msg: 'net work err'
          })
        } else if (result.code == 0) {
          res.json({
            code: 0,
            msg: result
          })
        } else {
          res.json({
            code: 202,
            msg: 'username or password is not fixed'
          })
        }
      })
    } else {
      res.json({
        code: 203,
        msg: 'param no fixed'
      })
    }
  });



module.exports = router;