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
                status: 'succeeded',
                updatedAt: '2016-08-08',
                urlImage: 'http://urlImage',
                description: 'some description',
                productInfo: {
                  productName: 'productName',
                  city: 'Auxtin',
                  state: 'Texas'
                },
                beneficiaryInfo: {
                  beneficiaryName: 'beneficiaryName'
                },
                attempts: [
                  {
                    status: 'failed',
                    dateAttemp: '2016-05-04',
                    last4: '1234',
                    accountBrand: 'american express',
                    transferId: 'tr_xxx'
                  }
                ]
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
    // url: '/api/v2/commerce/order/recent',
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
                'description': 'some description1',
                'productInfo': {
                  'productName': 'PaidUpteam',
                  'city': 'Auxtin',
                  'state': 'Texas'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
                },
                'attempts': [
                  {
                    'status': 'succeeded',
                    'dateAttemp': '2016-03-25',
                    'last4': '1234',
                    'accountBrand': 'american express',
                    'transferId': 'tr_xxx1'
                  }
                ]
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
                'description': 'some description2',
                'productInfo': {
                  'productName': 'PaidUpteam',
                  'city': 'Auxtin',
                  'state': 'Texas'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
                },
                'attempts': [
                  {
                    'status': 'succeeded',
                    'dateAttemp': '2016-02-25',
                    'last4': '1234',
                    'accountBrand': 'american express',
                    'transferId': 'tr_xxx2'
                  }
                ]
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
                'description': 'some description3',
                'productInfo': {
                  'productName': 'PaidUpteam',
                  'city': 'Auxtin',
                  'state': 'Texas'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
                },
                'attempts': [
                  {
                    'status': 'succeeded',
                    'dateAttemp': '2016-01-24',
                    'last4': '1234',
                    'accountBrand': 'american express',
                    'transferId': 'tr_xxx3'
                  }
                ]
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
                'description': 'some description4',
                'productInfo': {
                  'productName': 'Avengerteam',
                  'city': 'New york city',
                  'state': 'New york'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'IronMan'
                },
                'attempts': [
                  {
                    'status': 'succeeded',
                    'dateAttemp': '2016-01-20',
                    'last4': '1234',
                    'accountBrand': 'american express',
                    'transferId': 'tr_xxx4'
                  }
                ]
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
                'description': 'some description5',
                'productInfo': {
                  'productName': 'PaidUpteam',
                  'city': 'Auxtin',
                  'state': 'Texas'
                },
                'beneficiaryInfo': {
                  'beneficiaryName': 'JhonDoe'
                },
                'attempts': [
                  {
                    'status': 'failed',
                    'dateAttemp': '2015-12-25',
                    'last4': '1234',
                    'accountBrand': 'american express',
                    'transferId': 'tr_xxx5'
                  }
                ]
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
