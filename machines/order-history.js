module.exports = {
  friendlyName: 'get orders',
  description: 'get orders',
  cacheable: false,
  sync: false,
  inputs: {
    baseUrl: {
      example: 'http://localhost:9002',
      description: 'Url microservice.',
      required: true
    },
    token: {
      example: 'secret-word',
      description: 'secret word for authenticate microservice.',
      required: true
    },
    orderId: {
      example: 'orderId',
      description: 'orderId filter to retrieve orders',
      required: true
    },
    limit: {
      example: 5,
      description: 'quantity order to retrieve',
      required: false
    },
    sort: {
      example: 1,
      description: '1 or -1',
      required: false
    }
  },

  exits: {
    success: {
      friendlyName: 'order created with payments',
      description: 'order created',
      example: {
        status: 200,
        body: {
          orders: '*'
        }
      }
    },
    error: {
      description: 'error unexpected',
      example: {
        status: 500,
        message: '[{"maybe some JSON": "like this"}]  (but could be any string)'
      }
    }
  },

  fn: function (inputs, exits) {
    var Connector = require('../core/common/connector')

    var config = {
      url: '/api/v2/commerce/order/history',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }

    var body = {
      orderId: inputs.orderId,
      limit: inputs.limit,
      sort: inputs.sort
    }

    Connector.request(config, {}, body, function (err, resp) {
      if (err) {
        return exits.error({
          status: err.status,
          message: JSON.stringify(err.message)
        })
      } else {
        return exits.success({
          status: resp.status,
          body: resp.body
        })
      }
    })
  }
}
