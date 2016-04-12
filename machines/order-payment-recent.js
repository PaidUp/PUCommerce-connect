module.exports = {
  friendlyName: 'order payment recent',
  description: 'order payment recent',
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
    status: {
      example: '!pending',
      description: 'status to filter to retrieve a order',
      required: true
    },
    userId: {
      example: 'userId',
      description: 'owner order to retrieve',
      required: false
    },
    limit: {
      example: 5,
      description: 'quantity order to retrieve',
      required: true
    }
  },

  exits: {
    success: {
      friendlyName: 'order created with payments',
      description: 'order created',
      example: {
        status: 200,
        body: {
          orders: [
            {_id: 'IdOrder',
              orderId: 'orderId',
              userId: 'userId',
              paymentsPlan: [{
                _id: '_idpp',
                dateCharge: '2016-05-05',
                price: 100,
                status: 'pending',
                updatedAt: '2016-08-08',
                urlImage: '2016-08-08',
                productInfo: {
                  productName: 'productName'
                },
                beneficiaryInfo: {
                  beneficiaryName: 'beneficiaryName'
                }
              }]
            }]
      }}
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
    // var Connector = require('../core/common/connector')

    // var config = {
    // url: '/api/v2/commerce/order/list',
    // baseUrl: inputs.baseUrl,
    // method: 'post',
    // token: inputs.token
    // }

    var body = inputs
    console.log('body', body)

    return exits.success({
      status: 200,
      body: {
        orders: [{
          _id: 'IdOrder',
          orderId: 'orderId',
          orderId: '1000A1',
          userId: 'userId',
          paymentsPlan: [{
            _id: '_idpp',
            dateCharge: '2016-05-05',
            price: 100,
            status: 'pending',
            updatedAt: '2016-08-08',
            urlImage: '2016-08-08',
            productInfo: {
              productName: 'productName'
            },
            beneficiaryInfo: {
              beneficiaryName: 'beneficiaryName'
            }
          }]
        }]
      }
    })

  // Connector.request(config, {}, body, function (err, resp) {
  // if (err) {
  // return exits.error({
  // status: err.status,
  // message: JSON.stringify(err.message)
  // })
  // } else {
  // return exits.success({
  // status: resp.status,
  // body: resp.body
  // })
  // }
  // })
  }
}
