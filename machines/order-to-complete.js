module.exports = {
  friendlyName: 'orders to complete',
  description: 'orders to complete (cronjob)',
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
    }
  },

  exits: {
    success: {
      friendlyName: 'order completed',
      description: 'order completed',
      example: {
        status: 200,
        body: {
          ok: 1,
          nModified: 0,
          n: 0
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
      url: '/api/v2/commerce/order/complete',
      baseUrl: inputs.baseUrl,
      method: 'get',
      token: inputs.token
    }

    Connector.request(config, {}, {}, function (err, resp) {
      if (err) {
        return exits.error({
          status: err.status,
          message: err.body
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
