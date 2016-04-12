'use strict'
let proxyquire = require('proxyquire')
let test = require('tape')
// var requestStub = {}
// var orderService = require('../../services/order/order.service')
// https://github.com/substack/tape
// https://www.npmjs.com/package/proxyquire

test('order create', function (t) {
  let requestStub = function (input, cb) {
    return cb(null, {statusCode: 200}, {'jesse': 'cogollo'})
  }
  var orderService = proxyquire('../../services/order/order.service', {
    'request': requestStub
  })

  orderService.create({'data': 'data'}, function (err, data) {
    t.equal(err, null)
    t.equal(data.jesse, 'cogollo')
    t.end()
  })
})
