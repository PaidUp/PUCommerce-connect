module.exports = {
  friendlyName: 'get orders transactions',
  description: 'get orders transactions',
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
    organizationId: {
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
      friendlyName: 'order transactions',
      description: 'order transactions',
      example: {
        status: 200,
        body: "*"
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
      url: inputs.organizationId ? '/api/v3/commerce/order/transactions/organization/'+inputs.organizationId : '/api/v3/commerce/order/transactions',
      baseUrl: inputs.baseUrl,
      method: 'get',
      token: inputs.token
    }

    Connector.request(config, {}, {}, function (err, resp) {
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
