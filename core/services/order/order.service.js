'use strict';

var request = require('request')
// **
// ** Order
// **

exports.create = function(options, cb){
    request({
        uri:'http://localhost:9002/api/v1/commerce/order/create',
        json: true,
        method: 'POST',
        headers: { 'content-type': 'application/json; charset=UTF-8' },
        body: {}
    },
    function(err, res, body) {
        //console.log('--> statusCode', res.statusCode)//200
        //console.log('err', err)
        //console.log('res', res.statusCode)
        //console.log('body', body)
        return cb(err, body)
    })
}

/*exports.test = function(cb){
    request('http://localhost:9002/api/v1/commerce/order/create', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('--> statusCode', response.statusCode)
            console.log('-> body', body) // Show the HTML for the Google homepage.
            return cb(null, true)
        }
    })
}*/

/*
exports.orderLoad = function(orderId, cb) {
    httpUtil.httpRequest(config.app.connection, config.methods.GET, '/commerce/order/load/' + urlencode(orderId), {}, function (err, data) {
        if (err) {
            return cb(err);
        }
        if (data.status !== 200) {
            return cb(data.body);
        }
        return cb(null, data.body);
    });
}

exports.orderList = function(filter, cb) {
    httpUtil.httpRequest(config.app.connection, config.methods.POST, '/commerce/order/list', filter, function (err, data) {
        if (err) {
            return cb(err);
        }
        if (data.status !== 200) {
            return cb(data.body);
        }
        return cb(null, data.body);
    });
}

exports.orderCommentAdd = function(orderId, comment, status, cb) {
    httpUtil.httpRequest(config.app.connection, config.methods.POST, '/commerce/order/comment/create',
        {
            orderId: orderId,
            comment: comment,
            status: status
        }
        , function (err, data) {
        if (err) {
            return cb(err);
        }
        if (data.status !== 200) {
            return cb(data.body);
        }
        return cb(null, data.body);
    });
}

exports.orderUpdateStatus = function(orderId, status, cb) {
    httpUtil.httpRequest(config.app.connection, config.methods.GET,
        '/commerce/order/'+ urlencode(orderId) + '/status/' + urlencode(status),
        {}
        , function (err, data) {
            if (err) {
                return cb(err);
            }
            if (data.status !== 200) {
                return cb(data.body);
            }
            return cb(null, data.body);
        });
}

exports.createShipment = function(orderList, cb) {
    httpUtil.httpRequest(config.app.connection, config.methods.POST,
        '/commerce/order/createShipment/',
        orderList
        , function (err, data) {
            if (err) {
                return cb(err);
            }
            if (data.status !== 200) {
                return cb(data.body);
            }
            return cb(null, data.body);
        });
}
*/