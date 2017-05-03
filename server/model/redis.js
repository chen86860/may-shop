var redis = require('redis');
var poolModule = require('generic-pool');
var pool = poolModule.Pool({
  name: 'redisPool',
  create: function (callback) {
    var client = redis.createClient();
    callback(null, client)
  },
  destroy: function (client) {
    client.quit();
  },
  max: 100,
  min: 5,
  idleTimeoutMillis: 30000
  // log: true
});

//捡到一个瓶子
function pickOneBottle(info, callback) {
  var type = { all: Math.round(Math.random()), male: 0, female: 1 };
  info.type = info.type || 'all';
  pool.acquire(function (err, client) {
    if (err) return callback({ "code": 0, "msg": err })
    //根据请求类型从不同的数据库中取
    client.select(type[info.type], function () {
      //随机返回一个瓶子id
      client.randomkey(function (err, bottleId) {
        if (err) return callback({ code: 0, msg: err });
        if (!bottleId) return callback({ code: 1, msg: "海星" });
        client.hgetall(bottleId, function (err, bottle) {
          if (err) return callback({ code: 0, msg: "漂流瓶破损了。。。" });
          // 从redis中删除漂流瓶
          client.del(bottleId, function () {
            // pool.destory(client)
            pool.release(client);
          });
          pool.release(client);
          callback({ code: 1, msg: bottle })
        })
      });

    });
  });
}

//扔一个瓶子
function throwOneBottle(bottle, callback) {
  bottle.time = bottle.time || Date.now();
  //为每个瓶子生成唯一的id
  var bottleId = uuid.v4();
  var type = { male: 0, female: 1 };
  pool.acquire(function (err, client) {
    if (err) return callback({ "code": 0, "msg": err });
    client.select(type[bottle.type], function () {
      //以hash类型保存漂流瓶对象
      //将类别不同的漂流瓶放在不同的数据库，方便后期随机获取
      //HMSET key field value [field value ...]
      client.HMSET(bottleId, bottle, function (err, result) {
        if (err) return callback({ "code": 0, "msg": "过会儿再试试吧～" });
        // client.expire(bottleId, 86400 + bottle.time - Date.now())
        client.pexpire(bottleId, 86400 + bottle.time - Date.now(), function () {
          pool.release(client);
          callback({ code: 1, msg: "success" })
        })
      })
    })
  })
}

//检查用户是否超过捡瓶子的次数
function checkPicTimes(owner, callback) {
  pool.acquire(function (err, client) {
    if (err) return callback({ code: 0, msg: err });
    client.select(2, function () {
      client.get(owner, function (err, result) {
        if (result >= 10) {
          return callback({ code: 0, msg: "今天扔瓶子的机会已经用完啦～" });
        }
        else {
          //增加扔瓶子的次数
          client.incr(owner, function () {
            //检查是否是第一次扔瓶子
            //若是，则设置记录该用户扔瓶子的次数 键 的生存起为 1 天
            //若否，生存期保持不变
            client.TTL(owner, function (err, ttl) {
              if (ttl === -1) {
                client.expire(owner, 86400, function () {
                  //释放连接
                  pool.release();
                });
              } else {
                //释放连接
                pool.release();
              }
              callback({ code: 1, msg: ttl });
            });
          });
        }
      });
    });
  });
}

//检查用户是否超过扔瓶子的次数
function checkThrowTimes(owner, callback) {
  pool.acquire(function (err, client) {
    if (err) return callback({ code: 0, msg: err });
    client.select(3, function () {
      client.get(owner, function (err, result) {
        if (result >= 10) {
          return callback({ code: 0, msg: "今天扔瓶子的机会已经用完了～" });
        }
        else {
          //增加扔瓶子的次数
          client.incr(owner, function () {
            //检查是否是第一次扔瓶子
            //若是，则设置记录该用户扔瓶子的次数 键 的生存起为 1 天
            //若否，生存期保持不变
            client.TTL(owner, function (err, ttl) {
              if (ttl === -1) {
                client.expire(owner, 86400, function () {
                  //释放连接
                  pool.release();
                });
              } else {
                //释放连接
                pool.release();
              }
              callback({ code: 1, msg: ttl });
            });
          });
        }
      });
    });
  });
}

let login = (data, callback) => {
  //为每个瓶子生成唯一的id
  var uuid = data.username || 'default';
  console.log('login___________________', data)
  pool.acquire(function (err, client) {
    if (err) return callback({ "code": 0, "msg": err });
    //以hash类型保存漂流瓶对象
    //将类别不同的漂流瓶放在不同的数据库，方便后期随机获取
    //HMSET key field value [field value ...]
    client.hmset(uuid, { 'js': 'javascript', 'C#': 'C Sharp' }, function (err, result) {
      if (err) return callback({ "code": 0, "msg": "存入redis失败" });
      // client.expire(bottleId, 86400 + bottle.time - Date.now())
      client.pexpire(uuid, 8640, function () {
        pool.release(client);
        callback({ code: 1, msg: "success" })
      })
    })
  })
}

let signup = (data, callback) => {
  //为每个瓶子生成唯一的id
  console.log('signup', data)
  var uuid = data.username;
  pool.acquire(function (err, client) {
    if (err) return callback({ "code": 0, "msg": err });
    //以hash类型保存漂流瓶对象
    //将类别不同的漂流瓶放在不同的数据库，方便后期随机获取
    //HMSET key field value [field value ...]
    client.get(uuid, function (err, result) {
      if (err) return callback({ "code": 0, "msg": "存入redis失败" });
      // client.expire(bottleId, 86400 + bottle.time - Date.now())
      console.log('redis', result)
      callback(result)
    })
  })
}
exports.throw = function (bottle, callback) {
  checkThrowTimes(bottle.owner, function (result) {
    if (result.code === 0) {
      return callback(true, result);
    }
    throwOneBottle(bottle, function (result) {
      callback(false, result);
    });
  });
};

exports.pick = function (info, callback) {
  checkPicTimes(info.user, function (result) {
    if (result.code === 0) {
      return callback(result);
    }
    else {
      // 20% 概率捡到海星
      if (Math.random() <= 0.2) {
        return callback({ code: 1, msg: "海星" })
      }
      pickOneBottle(info, function (result) {
        callback(result);
      });
    }
  });

};

exports.login = function (data, callback) {
  login(data, (res) => {
    callback(res)
  })
}
exports.signup = function (data, callback) {
  signup(data, (res) => {
    callback(res)
  })
}
