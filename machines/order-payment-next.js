module.exports = {
  friendlyName: 'order payment next',
  description: 'order payment next',
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
    limit: {
      example: 1,
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
                last4: '1234',
                accountBrand: 'VISA',
                urlImage: 'http://urlImage',
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
    // url: '/api/v2/commerce/order/next',
    // baseUrl: inputs.baseUrl,
    // method: 'post',
    // token: inputs.token
    // }

    var body = inputs

    return exits.success({
      status: 200,
      body: {
        'orders': [
          {
            '_id': 'IdOrder6',
            'orderId': '1000A6',
            'userId': 'userId',
            'paymentsPlan': [
              {
                '_id': '_idpp6',
                'dateCharge': '2016-05-25',
                'price': 250,
                'status': 'pending',
                'last4': '1234',
                'accountBrand': 'VISA',
                'urlImage': 'https: //dl.dropboxusercontent.com/u/21524755/pu.png',
                'productInfo': {
                  'productName': 'PaidUpteam'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'Jhon Doe'
                }
              }
            ]
          }
        ]
    }})

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
