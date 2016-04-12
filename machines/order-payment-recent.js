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
        'orders': [
          {
            '_id': 'IdOrder1',
            'orderId': '1000A1',
            'userId': 'userId',
            'paymentsPlan': [
              {
                '_id': '_idpp1',
                'dateCharge': '2016-03-25',
                'price': 100,
                'status': 'succeeded',
                'updatedAt': '2016-03-25',
                'urlImage': 'https: //dl.dropboxusercontent.com/u/21524755/pu.png',
                'productInfo': {
                  'productName': 'PaidUpteam'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
                }
              }
            ]
          },
          {
            '_id': 'IdOrder2',
            'orderId': '1000A2',
            'userId': 'userId',
            'paymentsPlan': [
              {
                '_id': '_idpp2',
                'dateCharge': '2016-02-25',
                'price': 100,
                'status': 'succeeded',
                'updatedAt': '2016-02-25',
                'urlImage': 'https: //dl.dropboxusercontent.com/u/21524755/pu.png',
                'productInfo': {
                  'productName': 'PaidUpteam'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
                }
              }
            ]
          },
          {
            '_id': 'IdOrder3',
            'orderId': '1000A3',
            'userId': 'userId',
            'paymentsPlan': [
              {
                '_id': '_idpp3',
                'dateCharge': '2016-01-05',
                'price': 100,
                'status': 'succeeded',
                'updatedAt': '2016-01-25',
                'urlImage': 'https: //dl.dropboxusercontent.com/u/21524755/pu.png',
                'productInfo': {
                  'productName': 'PaidUpteam'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
                }
              }
            ]
          },
          {
            '_id': 'IdOrder4',
            'orderId': '1000A4',
            'userId': 'userId',
            'paymentsPlan': [
              {
                '_id': '_idpp4',
                'dateCharge': '2016-01-20',
                'price': 500,
                'status': 'succeeded',
                'updatedAt': '2016-01-20',
                'urlImage': 'https: //dl.dropboxusercontent.com/u/21524755/message.png',
                'productInfo': {
                  'productName': 'Avengerteam'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'IronMan'
                }
              }
            ]
          },
          {
            '_id': 'IdOrder5',
            'orderId': '1000A5',
            'userId': 'userId',
            'paymentsPlan': [
              {
                '_id': '_idpp5',
                'dateCharge': '2015-12-25',
                'price': 100,
                'status': 'failed',
                'updatedAt': '2015-12-25',
                'urlImage': 'https: //dl.dropboxusercontent.com/u/21524755/pu.png',
                'productInfo': {
                  'productName': 'PaidUpteam'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
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
