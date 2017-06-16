var express = require('express');
var router = express.Router();

var credentials = require('../lib/credentials');
var nodemailer = require('nodemailer');
var md5 = require('md5');
var uuid = require('uuid');
var ip = require('ip');
var Model = require('../model/model');


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
                console.log(result)
                if (err) {
                    res.json({
                        code: 201,
                        msg: 'net work err'
                    })
                } else if (result.code == 0) {
                    res.json({
                        code: 201,
                        msg: result
                    })
                } else {
                    res.json({
                        code: 201,
                        msg: 'net work err'
                    })
                }
            })
        } else {
            res.json({
                code: 201,
                msg: 'net work err'
            })
        }
    });

module.exports = router;