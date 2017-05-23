var express = require('express');
var router = express.Router();
var Model = require('../model/model')

/* GET home page. */
router
    .get('/', function (req, res, next) {
        res.render('index', { title: 'Express', content: 'Hello world' });
    });


var doorRule = 'ok'; // 门禁规则简版：ok直接开门,warn要求再次输入（收到check才开门）,lock则锁住,auto自动
router.route('/log')
    .post((req, res, next) => {
        // console.log( req, '<')
        let payload = {
            key: req.body.username || '',
            ipAdd: req.ip,
            username: req.body.username,
            code: req.body.code
        }
        if (req.body.code === 'warn') {
            Model.alert(0, (err, rest) => {
                if (err) {
                    console.log(err, rest)
                } else {
                    console.log('警报信息已发送！')
                }
            })
        }
        Model.logging(payload, (err, result) => {
            if (err) {
                res.json({
                    code: 100,
                    msg: 'bad'
                })
            } else {
                if (doorRule === 'warn') {
                    if (req.body.code === 'check') {
                        res.send('ok');
                    } else {
                        res.send('warn');
                    }
                } else {
                    res.send(doorRule);
                }
            }
        })
    })
router.post('/rule', (req, res) => {
    doorRule = req.body.rule;
});

router.post('/alert', (req, res, next) => {
    if (req.body && req.body.type) {
        // 0为入侵警报，1为低电量警报
        Model.alert(req.body.type, (err, result) => {
            if (err) {
                res.send('bad')
            } else {
                res.send(('ok'));
            }
        })
    }
})

module.exports = router;
