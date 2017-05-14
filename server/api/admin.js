var express = require('express');
var router = express.Router();
var Model = require('../model/model');

router.route('/login')
  .post(function (req, res, next) {
    if (req.body.username && req.body.password) {
      Model.adminlog(req.body, function (err, result) {
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
      Model.adminreg(req.body, function (err, result) {
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
router.route('/goods/index')
  .post(function (req, res, next) {
    if (req.body.page && req.body.count) {
      Model.getGoods(req.body, function (err, result) {
        if (err) {
          return res.json(result)
        } else {
          res.json(result)
        }
      })
    } else {
      res.json({
        code: -1
      })
    }
  });
router.route('/goods/del')
  .post(function (req, res, next) {
    if (req.body.id) {
      Model.delGood(req.body.id, function (err, result) {
        if (err) {
          return res.json(result)
        } else {
          res.json(result)
        }
      })
    } else {
      res.json({
        code: -1
      })
    }
  });
router.route('/goods/count')
  .post(function (req, res, next) {
    Model.getGoodsCount(null, function (err, result) {
      if (err) {
        return res.json(result)
      } else {
        res.json(result)
      }
    })
  });
router.route('/goods/update')
  .post(function (req, res, next) {
    Model.updateGood(req.body, function (err, result) {
      if (err) {
        return res.json(result)
      } else {
        res.json(result)
      }
    })
  });
router.route('/goods/add')
  .post(function (req, res, next) {
    Model.addGood(req.body, function (err, result) {
      if (err) {
        return res.json(result)
      } else {
        res.json(result)
      }
    })
  });

module.exports = router;