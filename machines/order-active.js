module.exports = {
  friendlyName: 'get active orders',
  description: 'get active orders',
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
      description: 'filter to retrieve orders',
      required: false
    },
    limit: {
      example: 1,
      description: 'filter to retrieve orders',
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
              status: 'active',
              userId: 'userId',
              paymentsPlan: [{
                destinationId: 'destinationId',
                _id: '_idpp',
                description: 'some description',
                email: 'email@email.com',
                dateCharge: '2016-05-05',
                price: 100,
                typeAccount: 'typeAccount',
                account: 'account',
                accountBrand: 'Diners Club',
                discount: 0,
                discountCode: 'discountCode',
                wasProcessed: false,
                status: 'pending',
                last4: '0000',
                originalPrice: 90,
                totalFee: 10,
                feePaidUp: 4.2,
                feeStripe: 3.6,
                attempts: [
                  {
                    status: 'success',
                    dateAttemp: '2016-05-05',
                    last4: '1234',
                    accountBrand: 'american express',
                    transferId: 'tr_xxx'
                  }
                ],
                processingFees: {
                  cardFeeActual: 12,
                  cardFeeDisplay: 21,
                  cardFeeFlatActual: 12,
                  cardFeeFlatDisplay: 21,
                  achFeeActual: 12,
                  achFeeDisplay: 21,
                  achFeeFlatActual: 12,
                  achFeeFlatDisplay: 21
                },
                collectionsFee: {
                  fee: 12,
                  feeFlat: 21
                },
                paysFees: {
                  processing: true,
                  collections: true
                },
                productInfo: {
                  productId: 'productId',
                  productName: 'productName',
                  productImage: 'someUrl',
                  organizationId: 'organizationId',
                  organizationName: 'organization name',
                  organizationLocation: 'Austin, TX',
                  organizationImage: 'someUrl'
                },
                userInfo: {
                  userId: 'UserId',
                  userName: 'userName'
                },
                beneficiaryInfo: {
                  beneficiaryId: 'beneficiaryId',
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
    /* var Connector = require('../core/common/connector')

    var config = {
      url: '/api/v2/commerce/order/active',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }*/

    var body = inputs.filter

    return exits.success({
      status: 200,
      body: {
        'orders': [
          {
            '_id': 'IdOrder7',
            'orderId': '1000A7',
            'userId': 'userId',
            'status': 'active',
            'paymentsPlan': [
              {
                '_id': '_idpp7',
                'dateCharge': '2016-06-25',
                'price': 250,
                'status': 'pending',
                'last4': '1234',
                'accountBrand': 'VISA',
                'destinationId': 'destinationId',
                'description': 'some description',
                'email': 'email@email.com',
                'typeAccount': 'typeAccount',
                'account': 'account',
                'discount': 0,
                'discountCode': 'discountCode',
                'wasProcessed': false,
                'originalPrice': 90,
                'totalFee': 10,
                'feePaidUp': 4.2,
                'feeStripe': 3.6,
                'urlImage': 'https: //dl.dropboxusercontent.com/u/21524755/pu.png',
                'attempts': [
                  {
                    'status': 'success',
                    'dateAttemp': '2016-05-05',
                    'last4': '1234',
                    'accountBrand': 'american express',
                    'transferId': 'tr_xxx'
                  }
                ],
                'processingFees': {
                  'cardFeeActual': 12,
                  'cardFeeDisplay': 21,
                  'cardFeeFlatActual': 12,
                  'cardFeeFlatDisplay': 21,
                  'achFeeActual': 12,
                  'achFeeDisplay': 21,
                  'achFeeFlatActual': 12,
                  'achFeeFlatDisplay': 21
                },
                'collectionsFee': {
                  'fee': 12,
                  'feeFlat': 21
                },
                'paysFees': {
                  'processing': true,
                  'collections': true
                },
                'productInfo': {
                  'productId': 'productId',
                  'productName': 'productName',
                  'productImage': 'someUrl',
                  'organizationId': 'organizationId',
                  'organizationName': 'organization name',
                  'organizationLocation': 'Austin, TX',
                  'organizationImage': 'someUrl'
                },
                'userInfo': {
                  'userId': 'UserId',
                  'userName': 'userName'
                },
                'beneficiaryInfo': {
                  'beneficiaryId': 'beneficiaryId',
                  'beneficiaryName': 'beneficiaryName'
                }
              }
            ]
          }
        ]
    }})
  /*
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
  })*/
  }
}
