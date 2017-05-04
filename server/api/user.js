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
          res.json(result)
        }
      })
    } else {
      res.json({
        code: 100,
        result: 'bad',
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
          res.json(result)
        }
      })
    } else {
      res.json({
        code: -1
      })
    }
  });

router.route('/session').post((req, res, next) => {
  if (req.body && req.body.username) {
    Model.session(req.body.username, (err, result) => {
      if (err) {
        res.json({
          code: -2,
          msg: 'network bad'
        })
      } else if (result.code === 0) {
        res.json({
          code: 0,
          msg: 'user is login'
        })
      } else {
        res.json({
          code: -1,
          msg: 'user no login'
        })
      }
    })
  } else {
    res.json({
      code: -1,
      msg: 'user no login'
    })
  }
})

router.route('/addCart').post((req, res, next) => {
  if (req.body && req.body.goodId) {
    Model.addCart(req.body, (err, result) => {
      if (err) {
        res.json({
          code: -2,
          msg: 'network bad'
        })
      } else {
        res.json({
          code: 0,
          msg: result
        })
      }
    })
  } else {
    res.json({
      code: -1,
      msg: 'user no login'
    })
  }
})

router.route('/cart').post(function (req, res, next) {
  if (req.body.username) {
    // 判断用户权限
    Model.getCart(req.body.username, (err, result) => {
      if (err) {
        res.json({
          code: 100,
          msg: 'user no login'
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
      code: 100,
      msg: 'user no login'
    })
  }
});
router.route('/createOrder').post(function (req, res, next) {
  if (req.body.username) {
    // 判断用户权限
    Model.createOrder(req.body.username, (err, result) => {
      if (err) {
        res.json({
          code: 100,
          msg: 'user no login'
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
      code: 100,
      msg: 'user no login'
    })
  }
});
router.route('/changeChecked').post(function (req, res, next) {
  if (req.body && req.body.goodId) {
    // 判断用户权限
    Model.changeChecked(req.body, (err, result) => {
      if (err) {
        res.json({
          code: 100,
          msg: 'user no login'
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
      code: 100,
      msg: 'user no login'
    })
  }
});
router.route('/cartGoodAdd').post(function (req, res, next) {
  if (req.body && req.body.goodId) {
    // 判断用户权限
    Model.cartGoodAdd(req.body, (err, result) => {
      if (err) {
        res.json({
          code: 100,
          msg: 'user no login'
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
      code: 100,
      msg: 'user no login'
    })
  }
});
router.route('/cartGoodSub').post(function (req, res, next) {
  if (req.body && req.body.goodId) {
    // 判断用户权限
    Model.cartGoodSub(req.body, (err, result) => {
      if (err) {
        res.json({
          code: 100,
          msg: 'user no login'
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
      code: 100,
      msg: 'user no login'
    })
  }
});
module.exports = router;
