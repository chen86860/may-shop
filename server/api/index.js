var express = require('express')
var router = express.Router()
var Model = require('../model/model');

router.get('/he', function (req, res, next) {
  res.json({ message: 'Hel' })
  res.end()
})

router.route('/cart').post(function (req, res, next) {
  console.log(req.body)
  if (req.body.username) {
    // 判断用户权限
    Model.session(req.body.username, (res) => {
      if (res.code == 0) {
        console.log('login_______ succeed')
      } else {
        res.json({
          code: 0,
          msg: 'user no login'
        })
      }
    })
  } else {
    res.json({
      code: 0,
      msg: 'user no login'
    })
  }
});

router.route('/goods').post(function (req, res, next) {
  Model.getGoods(null, (result) => {
    if (result.code === 0) {
      console.log(result)
      res.json({
        code: 0,
        msg: result.msg
      })
    } else {
      res.json({
        code: 100,
        msg: 'network errr'
      })
    }
  })
});

module.exports = router;