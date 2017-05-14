var mongoose = require('mongoose');
var md5 = require('md5');
var uuid = require('uuid')
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
    id: {
        type: String
    },
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
    },
    fileList: {
        type: Object
    },
    initTime: {
        type: Date,
        default: Date.now
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
        default: true
    }
}, {
        collection: 'cart'
    }))

/**
 * 商品Model
 */
var orderModel = mongoose.model('orders', new mongoose.Schema({
    userId: {
        type: String
    },
    orderId: {
        type: String
    },
    price: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    },
    payMethod: {
        type: String,
        default: '微信支付'
    },
    address: {
        type: Object
    },
    initTime: {
        type: Date,
        default: Date.now
    },
    goods: {
        type: Array
    }
}, {

        collection: 'orders'
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
                                id: result.id,
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
                                id: result.id,
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
                        id: result[0].id,
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
                        id: result.id,
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
    if (data) {
        let limit = data.count
        let skip = parseInt((data.page - 1) * data.count, 10)
        goodModel.find().sort({ initTime: 1 }).limit(limit).skip(skip).exec((err, res) => {
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
    } else {
        goodModel.find({}, (err, res) => {
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

}

exports.getGoodsCount = (data, callback) => {
    goodModel.find().count((err, res) => {
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
exports.delGood = (id, callback) => {
    if (!id) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    goodModel.remove({ id: id }, (err, res) => {
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
 * 新增商品
 */
exports.addGood = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    var newGood = {}
    // 生成唯一id
    newGood.id = uuid.v4()
    newGood.name = data.name
    newGood.subName = data.subName
    newGood.fileList = data.fileList
    newGood.price = data.price
    newGood.count = data.count
    newGood.desc = data.desc
    newGood.group = data.group
    newGood.img = data.img
    newGood = new goodModel(newGood)
    newGood.save((err, result) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: 'network err'
            })
        } else {
            callback(false, {
                code: 0,
                msg: result
            })
        }
    })
}
/**
 * 更新商品
 */
exports.updateGood = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    goodModel.remove({ id: data.id }, (err, res) => {
        var newGood = {}
        // 保证物品不会消失
        newGood.id = data.id
        newGood.name = data.name
        newGood.subName = data.subName
        newGood.price = data.price
        newGood.count = data.count
        newGood.desc = data.desc
        newGood.img = data.img
        newGood.group = data.group
        newGood.fileList = data.fileList
        newGood.initTime = data.initTime
        newGood = new goodModel(newGood)
        newGood.save((err, result) => {
            if (err) {
                callback(true, {
                    code: 101,
                    msg: 'network err'
                })
            } else {
                callback(false, {
                    code: 0,
                    msg: result
                })
            }
        })
    })
}
/**
 * 获取全部订单
 */
exports.orderAll = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    orderModel.find({ userId: data.userId }, (err, res) => {
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
 * 获取订单详情
 */
exports.orderDetail = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    orderModel.find({ userId: data.userId, orderId: data.orderId }, (err, res) => {
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
 * 获取全部订单
 */
exports.orderWait = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    orderModel.find({ userId: data.userId, paid: false }, (err, res) => {
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
 * 获取全部订单
 */
exports.orderPaid = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    orderModel.find({ userId: data.userId, paid: true }, (err, res) => {
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
 * 支付订单
 */
exports.orderPay = (data, callback) => {
    if (!data) {
        callback(true, {
            code: 101,
            msg: 'id is must params'
        })
    }
    orderModel.update({ orderId: data.orderId, userId: data.userId }, { $set: { paid: true, payMethod: data.method } }, (err, res) => {
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
    goodModel.find({ id: id }, (err, res) => {
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
exports.createOrder = (data, callback) => {
    if (!data.userId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    cartModel.find({ userId: data.userId, checked: true }, (err, res) => {
        if (err) {
            callback(true, {
                code: 100,
                msg: 'network err'
            })
        } else {
            let price = 0
            res.forEach((e) => {
                price += parseInt(e.price, 10) * parseInt(e.count, 10)
            })

            let order = {}
            order.userId = data.userId
            order.address = data.address[0]
            order.orderId = uuid.v4()
            order.price = price
            order.goods = res
            order = new orderModel(order)
            order.save((err, resu) => {
                if (err) {
                    callback(true, {
                        code: 100
                    })
                } else {
                    cartModel.remove({ userId: data.userId, checked: true }, (err, resss) => {
                        callback(false, {
                            code: 0,
                            msg: {
                                orderId: resu.orderId,
                                price: resu.price

                            }
                        })
                    })

                }
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
            goodModel.findOne({ id: data.goodId }, (err, ress) => {
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
 * 新增地址
 * @param{goodId,userId,count}
 */
exports.addAds = (data, callback) => {
    if (!data.userId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    let address = {
        id: uuid.v4(),
        name: data.address.name,
        mobile: data.address.mobile || '',
        ads: data.address.ads || '',
        detailAds: data.address.detailAds || ''
    }
    userInfo.update({ _id: data.userId }, { $push: { address: address } }, (err, res) => {
        if (err) {
            callback(true, {
                code: '100',
                msg: 'network err'
            })
        } else {
            userInfo.find({ _id: data.userId }, { address: 1 }, (err, result) => {
                if (err) {
                    callback(true, {
                        code: '100',
                        msg: 'network err'
                    })
                } else {
                    callback(false, {
                        code: 0,
                        msg: result
                    })
                }
            })

        }
    })
}
/**
 * 删除地址
 * @param{userId,addressId}
 */
exports.delAds = (data, callback) => {
    if (!data.userId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    userInfo.update({ _id: data.userId }, { $pull: { 'address': { 'id': data.id } } }, (err, res) => {
        if (err) {
            callback(true, {
                code: '100',
                msg: 'network err'
            })
        } else {
            userInfo.find({ _id: data.userId }, { address: 1 }, (err, result) => {
                if (err) {
                    callback(true, {
                        code: '100',
                        msg: 'network err'
                    })
                } else {
                    callback(false, {
                        code: 0,
                        msg: result
                    })
                }
            })
        }
    })
}
/**
 * 更新地址
 * @param{userId,addressId}
 */
exports.updateAds = (data, callback) => {
    if (!data.userId) {
        callback(true, {
            code: 100,
            msg: 'goods not exist'
        })
        return
    }
    userInfo.update({ _id: data.userId }, { $pull: { 'address': { 'id': data.address.id } } }, (err, res) => {
        if (err) {
            callback(true, {
                code: '100',
                msg: 'network err'
            })
        } else {
            let address = {
                id: data.address.id,
                name: data.address.name,
                mobile: data.address.mobile || '',
                ads: data.address.ads || '',
                detailAds: data.address.detailAds || ''
            }
            userInfo.update({ _id: data.userId }, { $push: { address: address } }, (err, res) => {
                if (err) {
                    callback(true, {
                        code: '100',
                        msg: 'network err'
                    })
                } else {
                    userInfo.find({ _id: data.userId }, { address: 1 }, (err, result) => {
                        if (err) {
                            callback(true, {
                                code: '100',
                                msg: 'network err'
                            })
                        } else {
                            callback(false, {
                                code: 0,
                                msg: result
                            })
                        }
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

function copy(obj) {
    var copy = Object.create(Object.getPrototypeOf(obj));
    var propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function (name) {
        var desc = Object.getOwnPropertyDescriptor(obj, name);
        Object.defineProperty(copy, name, desc);
    });

    return copy;
}