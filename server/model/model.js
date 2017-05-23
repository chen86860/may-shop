var mongoose = require('mongoose');
var credentials = require('../lib/credentials');
var md5 = require('md5');
var uuid = require('uuid');
var ip = require('ip');
var credentials = require('../lib/credentials');
var nodemailer = require('nodemailer');

mongoose.Promise = global.Promise;
mongoose.connect(credentials.mongo.development.connectString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    //succeed
});

/**
 * 系统配置
 */
var config = mongoose.model('config', new mongoose.Schema({
    puinished: {
        type: Array,
        default: ['chen86860@163.com']
    },
    type: {
        type: Number,
        // 0 非法闯入警报
        // 1 低电量警报
        default: 0
    },
    title: {
        type: Array
    },
    lang: {
        type: String
    },
    rule: {
        type: String
    },
    time: {
        type: Number
    },
    email: {
        type: String
    }
}, {
        collection: 'config'
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
    address: {
        type: Array
    },
    startTime: {
        type: Number
    },
    endTime: {
        type: Number
    },
    code: { type: String },
    mobile: {
        type: String
    }
}, {
        collection: 'userinfo'
    }));

/**
 * 日志记录
 */
var log = mongoose.model('log', new mongoose.Schema({
    username: {
        type: String
    },
    ipAdd: {
        type: String
    },
    logTime: {
        type: Number,
        default: 0
    },
    code: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}))

/**
 * 管理员后台
 */
var admin = mongoose.model('admin', new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    initTime: {
        type: Date,
        default: Date.now
    }
}))


/**
 * 用户注册
 * @param{username,password}
 */
exports.adminReg = (data, callback) => {
    admin.find({ username: data.username }, (err, result) => {
        if (err) {
            callback(true, {
                code: 100
            })
        } else if (result.length == 0) {
            let user = {}
            user.username = data.username
            user.password = md5(data.password + data.username)
            user.email = data.email
            user = new admin(user);
            user.save((err, res) => {
                if (err) {
                    callback(true, {
                        code: 101
                    })
                } else {
                    callback(false, {
                        code: 0,
                        msg: res
                    })
                }
            })
        } else {
            callback(true, {
                code: 102
            })
        }
    })

}
/**
 * 用户注册
 * @param{username,password}
 */
exports.userReg = (data, callback) => {
    userInfo.find({ username: data.username }, (err, result) => {
        if (err) {
            callback(true, {
                code: 100
            })
        } else if (result.length == 0) {
            let user = {}
            user.username = data.username
            user.password = md5(data.password + data.username)
            user.email = data.email
            user = new userInfo(user);
            user.save((err, res) => {
                if (err) {
                    callback(true, {
                        code: 101
                    })
                } else {
                    callback(false, {
                        code: 0,
                        msg: res
                    })
                }
            })
        } else {
            callback(true, {
                code: 102
            })
        }
    })

}
/**
 * 用户登录
 * @param{username,password}
 */
exports.adminLogin = (data, callback) => {
    let payload = {
        username: data.username,
        password: md5(data.password + data.username)
    }
    admin.find(payload, (err, res) => {
        if (err) {
            callback(true, {
                code: 100
            })
        } else {
            if (res.length > 0) {
                callback(false, {
                    code: 0,
                    msg: res
                })
            } else {
                callback(true, {
                    code: 100,
                    msg: res
                })
            }
        }
    })
}

/**
 * 检查是否超过最大检查次数 5 
 */
exports.prevCheck = (data, callback) => {
    attempTime.findOne({}, { attempTime: 1 }, (err, res) => {
        if (err) {
            callback(true, {
                code: 0
            })
        } else {
            callback(false, {
                code: 0,
                msg: res[0].attempTime > 5
            })
        }
    })
}
/**
 * 重置次数
 */
exports.resetCount = (callback) => {
    attempTime.update({}, { attempTime: 0 }, (err, res) => {
        if (err) {
            callback(true, {
                code: 100
            })
        } else {
            callback(false, {
                code: 0
            })
        }
    })
}

/**
 * 日志记录
 */
exports.logging = (data, callback) => {
    let logg = {}

    logg.username = data.key
    logg.ipAdd = data.ipAdd
    logg.code = data.code
    logg = new log(logg)
    console.log('bad1')
    logg.save((err, res) => {
        if (err) {
            console.log('bad3', res)
            callback(true, {
                code: 100
            })
        } else {
            callback(false, {
                code: 0
            })
        }
    })
}
/**
 * 发送邮件
 * @param{recipitnes,subject,conten,mailType,callback}
 */
exports.sendEmail = (recipients, subject, content, mailType, callback) => {
    var mailType = mailType || 'text';

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(credentials.stmp.stmpSecert);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Jams" <chen86860@yeah.net', // sender address
        to: recipients, // list of receivers
        subject: subject // Subject line
        // mailType: content // plaintext body
    };
    mailOptions[mailType] = content;

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        var status = '';
        var details = '';
        if (error) {
            status = 'err';
            details = (typeof (info) != 'undefined') ? info : 'Mail Server Refuse'
        }
        else {
            status = 'ok';
            details = (typeof (info) != 'undefined') ? info : 'Mail Server Refuse'
        }

        if (callback && typeof (callback) == 'function') {
            callback(status, details);
        }
    });
}

exports.alert = (t, callback) => {
    let type = parseInt(t, 10) || 0
    let email = [
        {
            recip: 'chen86860@yeah.net',
            title: '门禁系统非法闯入警报',
            content: '【门禁系统非法闯入警报】' + new Date() + '门禁系统短时间内已被大量非法尝试，请注意财产安全'
        },
        {
            recip: 'chen86860@yeah.net',
            title: '门禁系统低电量警报',
            content: '门禁系统低电量过低，请及时更换电池'
        }
    ]
    exports.sendEmail(email[type].recip, email[type].title, email[type].content, 'html', (status, details) => {
        if (status == 'ok') {
            callback(false, {
                code: 0,
                msg: details
            })
        } else {
            callback(true, {
                code: 202,
                msg: details
            })
        }
    })
}

exports.logIndex = (data, callback) => {
    let type = data.type || 'ok'
    let limit = data.count
    let skip = parseInt((data.page - 1) * data.count, 10)
    console.log(type, limit, skip)
    log.find({ code: type }).limit(limit).skip(skip).exec((err, res) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: res
            })
        } else {
            console.log('bad3')
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}
exports.logUserIndex = (data, callback) => {
    log.find({ username: data.username }).exec((err, res) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: res
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}
exports.userIndex = (data, callback) => {
    let limit = data.count
    let skip = parseInt((data.page - 1) * data.count, 10)
    userInfo.find().limit(limit).skip(skip).exec((err, res) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: res
            })
        } else {
            console.log('bad3')
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}
exports.logIndexCount = (data, callback) => {
    let type = data.type || 'ok'
    log.find({ code: type }).count().exec((err, res) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: res
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}
exports.userIndexCount = (data, callback) => {
    userInfo.find().count().exec((err, res) => {
        if (err) {
            callback(true, {
                code: 101,
                msg: res
            })
        } else {
            callback(false, {
                code: 0,
                msg: res
            })
        }
    })
}