var mongoose = require('mongoose');
var md5 = require('md5');
mongoose.connect('mongodb://localhost/may_shop', { server: { poolSoze: 10 } });

/**
 * sessionModel
 */
var userSession = mongoose.model('session', new mongoose.Schema({
    username: {
        type: String
    },
    initTime: {
        type: Date,
        default: Date.now,
        expires: 10 * 60
    }
}))

/**
 * 用户Model
 */
var userInfo = mongoose.model('userinfo', new mongoose.Schema({
    username: String,
    password: {
        type: String,
        minlength: 4
    },
    email: {
        type: String
    },
    regTime: {
        type: Date,
        default: Date.now
    },
    address: {
        type: Array
    },
    mobile: {
        type: String
    },
    lever: {
        type: Number,
        default: 1
    }
}, {
        collection: 'userinfo'
    }));

/**
 * 商品Model
 */
var goodModel = mongoose.model('goods', new mongoose.Schema({
    name: {
        type: String
    },
    subName: {
        type: String
    },
    img: {
        type: Array
    },
    price: {
        type: Number
    },
    count: {
        type: Number
    },
    desc: {
        type: String
    },
    checked: {
        type: Boolean,
        default: false
    },
    group: {
        type: Number
    }
}, {

        collection: 'goods'
    }))

/**
 * 购物车model
 */
var cartModel = mongoose.model('cart', new mongoose.Schema({
    title: {
        type: String
    },
    img: {
        type: String
    }, price: {
        type: Number
    }, count: {
        type: Number,
        default: 1
    }, userID: {
        type: String
    },
    checked: {
        type: Boolean
    }
}))
/**
 * 用户注册
 * @param{username,password,email}
 */
exports.userreg = function (regbody, callback) {
    var time = Date.now();
    var newuser = {};
    newuser.username = regbody.username;
    //check user
    userInfo.find({ username: regbody.username }, function (err, result) {
        if (err) {
            callback(true, { code: 202, msg: "username is exist" })
        } else {
            if (result.length > 0) {
                callback(true, { code: 202, msg: "username is exist" })
            } else {
                var salt = "-2.1']125.z"
                newuser.password = md5(md5(regbody.username + regbody.password + salt));
                newuser.email = regbody.email;
                newuser.time = time;
                newuser = new userInfo(newuser);
                //save to db
                newuser.save(function (err, result) {
                    if (err) {
                        callback(true, { code: 201, msg: "connect err" });
                    } else {
                        callback(false, {
                            code: 0, msg: {
                                username: result.username,
                                address: result.address,
                                id: result._id,
                                lever: result.lever
                            }
                        })
                    }
                })
            }
        }
    })
};

/**
 * 用户登录
 * @param{username,password}
 */
exports.userlog = function (logbody, callback) {
    var salt = "-2.1']125.z"
    userInfo.find({
        username: logbody.username,
        password: md5(md5(logbody.username + logbody.password + salt))
    }, function (err, result) {
        if (err) {
            callback(true, { code: 201, msg: "login failed" });
        }
        else {
            if (result.length > 0) {
                // 登录成功后，新增session记录
                userSession.findOneAndUpdate({ username: logbody.username }, { username: logbody.username }, { upsert: true }, (err, result) => {
                    if (err) {
                        console.log('session add err')
                    } else {
                        console.log('session added!')
                    }
                })
                callback(false, {
                    code: 0, msg: {
                        username: result[0].username,
                        address: result[0].address,
                        id: result[0]._id,
                        lever: result[0].lever
                    }
                })
            } else {
                callback(true, { code: 202, msg: "username or passwords is not match" })
            }
        }
    })
};

/**
 * 用户状态判断
 * 十分钟后失效
 * @param{username}
 */
exports.session = (username, callback) => {
    if (username.length > 0) {
        userSession.find({ username: username }, (err, res) => {
            if (err) {
                callback({
                    code: 0
                })
            } else {
                callback({
                    code: 100
                })
            }
        })
    }
}

exports.getGoods = (data, callback) => {
    let condition = {}
    if (data) {
        condition = { group: data }
    }
    goodModel.find(condition, (err, res) => {
        if (err) {
            callback({
                code: 101,
                msg: 'network err'
            })
        } else {
            callback({
                code: 0,
                msg: res
            })
        }
    })
}

exports.getDetail = (id, callback) => {
    if (!id) {
        callback({
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    goodModel.find({ _id: id }, (err, res) => {
        if (err) {
            callback({
                code: 100,
                msg: 'network err'
            })
        } else {
            callback({
                code: 0,
                msg: res
            })
        }
    })
}