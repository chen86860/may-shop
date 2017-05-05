var express = require('express')
var router = express.Router()
var Model = require('../model/model');


router.route('/detail').post((req, res, next) => {
  if (req.body.id) {
    Model.getDetail(req.body.id, (result) => {
      if (result.code == 0) {
        res.json({
          code: 0,
          msg: result.msg
        })
      } else {
        res.json({
          code: 100,
          msg: 'good not exist'
        })
      }
    })
  } else {
    res.json({
      message: 'GOOD'
    })
  }

})


router.route('/goods').post(function (req, res, next) {
  Model.getGoods(null, (result) => {
    if (result.code === 0) {
      res.json({
        code: 0,
        msg: result.msg
      })
    } else {
      res.json({
        code: 100,
        msg: 'network err'
      })
    }
  })
});

module.exports = router;