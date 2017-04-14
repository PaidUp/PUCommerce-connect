module.exports = {
  friendlyName: 'order notification charge next',
  description: 'get order for notify charge',
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
    date: {
      example: '2017-04-14T17:57:39.781Z',
      description: 'include orders until this date',
      required: true
    }
  },

  exits: {
    success: {
      friendlyName: 'order created with payments',
      description: 'order created',
      example: {
        status: 200,
        body: '*'
      }
    }
  },
  error: {
    description: 'error unexpected',
    example: {
      status: 500,
      message: '[{"maybe some JSON": "like this"}]  (but could be any string)'
    }
  },

  fn: function (inputs, exits) {
    var Connector = require('../core/common/connector')

    var config = {
      url: '/api/v3/commerce/order/charge/notification/' + inputs.date,
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
