/**
 * Created by jack on 8/4/17.
 */
exports.credentials = {
    cookieSecret: 'bowl aboard somehow baby',
    mongo: { development: { connectString: "mongodb://localhost/door" }, production: { connectString: "Connect String" } },
    stmp: {
        stmpSecert: ""
    }
};


module.exports = exports.credentials;
