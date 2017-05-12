var mongoose = require('mongoose');
var md5 = require('md5');
mongoose.connect('mongodb://localhost/may_shop', { server: { poolSoze: 10 } });

// ==============================
// 用户操作相关
// ==============================

/**
 * sessionModel
 */
var userSession = mongoose.model('session', new mongoose.Schema({
    username: {
        type: String,
    },
    initTime: {
        type: Date,
        default: Date.now,
        expires: 10 * 60
    }
}, {
        collection: 'session'
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
    userId: {
        type: String,
    },
    goodId: {
        type: String,
    },
    name: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    count: {
        type: Number,
        default: 1
    },
    checked: {
        type: Boolean,
        default: false
    }
}, {
        collection: 'cart'
    }))

// ==============================
// 管理员操作相关
// ==============================
var adminInfo = mongoose.model('adminInfo', new mongoose.Schema({
    userId: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    createTime: {
        type: Date,
        default: Date.now
    }
}, {
        collection: 'adminInfo'
    }))
var codeModel = mongoose.model('code', new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    }
}, {
        collection: 'code'
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
                        // 登录成功后，新增session记录
                        var session = new userSession({ username: regbody.username })
                        session.save((err, result) => {
                            if (err) {
                                console.log('session add err')
                            } else {
                                console.log('session added!')
                            }
                        })
                        callback(false, {
                            code: 0, msg: {
                                username: result.username,
                                address: result.address,
                                id: result._id,
                                lever: result.lever,
                                email: result.email
                            }
                        })
                    }
                })
            }
        }
    })
};
/**
 * 管理员注册
 * @param{username,password,email,code}
 */
exports.adminreg = function (regbody, callback) {
    var newuser = {};
    newuser.username = regbody.username;
    //check user
    adminInfo.find({ username: regbody.username }, function (err, result) {
        if (err) {
            callback(true, { code: 202, msg: "username is exist" })
        } else {
            if (result.length > 0) {
                callback(true, { code: 202, msg: "username is exist" })
            } else {
                var salt = "-2.1']125.z1.d23-0"
                newuser.password = md5(md5(regbody.username + regbody.password + salt));
                newuser.email = regbody.email;
                newuser = new adminInfo(newuser);
                //save to db
                newuser.save(function (err, result) {
                    if (err) {
                        callback(true, { code: 201, msg: "connect err" });
                    } else {
                        // 登录成功后，新增session记录
                        var session = new userSession({ username: regbody.username, type: '2' })
                        session.save((err, result) => {
                            if (err) {
                                console.log('session add err')
                            } else {
                                console.log('session added!')
                            }
                        })
                        callback(false, {
                            code: 0, msg: {
                                username: result.username,
                                id: result._id,
                                email: result.email
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
                var session = new userSession({ username: logbody.username })
                session.save((err, result) => {
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
                        lever: result[0].lever,
                        email: result[0].email
                    }
                })
            } else {
                callback(true, { code: 202, msg: "username or passwords is not match" })
            }
        }
    })
};

/**
 *管理员登录
 * @param{username,password}
 * 
 */
exports.adminlog = function (logbody, callback) {
    var salt = "-2.1']125.z1.d23-0"
    adminInfo.findOne({
        username: logbody.username,
        password: md5(md5(logbody.username + logbody.password + salt))
    }, function (err, result) {
        if (err) {
            callback(true, { code: 201, msg: "login failed" });
        }
        else {
            if (result) {
                // 登录成功后，新增session记录
                var session = new userSession({ username: logbody.username, type: '2' })
                session.save((err, result) => {
                    if (err) {
                        console.log('session add err')
                    } else {
                        console.log('session added!')
                    }
                })
                callback(false, {
                    code: 0, msg: {
                        username: result.username,
                        id: result._id,
                        email: result.email
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
                callback(true, {
                    code: -1
                })
            } else {
                callback(false, {
                    code: 0
                })
            }
        })
    } else {
        callback(true, {
            code: -1
        })
    }
}
/**
 * 获取全部商品
 */
exports.getGoods = (data, callback) => {
    let limit = null, skip = null
    console.log(data)
    if (data) {
        limit = data.count
        skip = parseInt((data.page - 1) * data.count, 10)
    }
    goodModel.find().limit(limit).skip(skip).exec((err, res) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}
/**
 * 删除商品
 */
exports.delGood = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    goodModel.remove({ _id: data.id }, (err, res) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}

/**
 * 获取商品详情
 * @param{goodId}
 */
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

/**
 * 获取购物车详情
 * @param{userId}
 */
exports.getCart = (id, callback) => {
    if (!id) {
        callback({
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    cartModel.find({ userId: id }, (err, res) => {
        if (err) {
            callback(true, {
                code: 100,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}
/**
 * 预创建订单
 * @param{userId}
 */
exports.prevCreateOrder = (id, callback) => {
    if (!id) {
        callback({
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    cartModel.find({ userId: id, checked: true }, (err, res) => {
        if (err) {
            callback(true, {
                code: 100,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}
/**
 * 创建订单
 * @param{userId}
 */
exports.createOrder = (id, callback) => {
    if (!id) {
        callback({
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    cartModel.find({ userId: id, checked: true }, (err, res) => {
        if (err) {
            callback(true, {
                code: 100,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}

/**
 * 加入物品到购物车
 * @param{goodId,userId,count}
 */
exports.addCart = (data, callback) => {
    if (!data.goodId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    let query = {
        goodId: data.goodId,
        userId: data.userId
    }
    cartModel.find(query, (err, res) => {
        if (err) {
            callback(true, {
                code: 100,
                msg: 'network err'
            })
        } else if (res.length == 0) {
            goodModel.findOne({ _id: data.goodId }, (err, ress) => {
                if (err) {
                    callback(true, {
                        code: 100,
                        msg: 'network err'
                    })
                } else {
                    let cart = {
                        goodId: data.goodId,
                        userId: data.userId,
                        count: data.count,
                        img: ress.img[0],
                        name: ress.name,
                        price: ress.price
                    }
                    cart = new cartModel(cart)
                    cart.save((err, resss) => {
                        console.log('new add cart')
                        if (err) {
                            callback(true, {
                                code: 100,
                                msg: 'network err'
                            })
                        } else {
                            callback(false, {
                                code: 0,
                                msg: 'new add cart succeed!'
                            })
                        }
                    })
                }
            })

        } else {
            cartModel.update(query, { $set: { count: parseInt(res[0].count, 10) + data.count } }, (err, result) => {
                console.log('new add cart')
                if (err) {
                    callback(true, {
                        code: 100,
                        msg: 'network err'
                    })
                } else {
                    callback(false, {
                        code: 0,
                        msg: 'count add cart succeed!'
                    })
                }
            })
        }
    })
}
/**
 * 更新物品选中状态
 */


exports.changeChecked = (data, callback) => {
    if (!data.userId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    var query = {
        userId: data.userId,
        goodId: data.goodId
    }
    cartModel.find(query, (err, result) => {
        cartModel.update(query, { $set: { "checked": !result[0].checked } }, (err, res) => {
            if (err) {
                callback(true, {
                    code: 100,
                    msg: 'network err'
                })
            } else {
                callback(false, {
                    code: 0,
                    msg: res
                })
            }
        })
    })

}
/**
 * 增加物品数量
 */
exports.cartGoodAdd = (data, callback) => {
    if (!data.userId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    var query = {
        userId: data.userId,
        goodId: data.goodId
    }
    cartModel.update(query, { $inc: { "count": 1 } }, (err, res) => {
        if (err) {
            callback(true, {
                code: 100,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })

}
/**
 * 减少物品数量
 */
exports.cartGoodSub = (data, callback) => {
    if (!data.userId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    var query = {
        userId: data.userId,
        goodId: data.goodId
    }
    cartModel.update(query, { $inc: { "count": -1 } }, (err, res) => {
        if (err) {
            callback(true, {
                code: 100,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })

}