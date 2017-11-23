module.exports = {
  friendlyName: 'get orders by payment method',
  description: 'get orders by payment method',
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
    userId: {
      example: 'userId',
      description: 'owner order to retrieve',
      required: false
    },
    accountId: {
      example: "5",
      description: 'payment method id',
      required: true
    },
    status: {
      example: ["failed", "pending"],
      description: 'due status',
      required: true
    }
  },

  exits: {
    success: {
      friendlyName: 'orders list',
      description: 'orders list',
      example: {
        status: 200,
        body: {
          orders: []
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
    var accountId = inputs.accountId;
    var status = inputs.status.join();

    var config = {
      url: encodeURI('/api/v3/commerce/order/source/' + accountId + "?status=" + status),
      baseUrl: inputs.baseUrl,
      method: 'get',
      token: inputs.token
    }

    Connector.request(config, {}, {}, function (err, resp) {
      if (err) {
        console.log(err)
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
