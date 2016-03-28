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
    filter: {
      example: '*',
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
              status: 'processing',
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
                discount: 0,
                discountCode: 'discountCode',
                wasProcessed: false,
                status: 'pending',
                last4: '0000',
                originalPrice: 90,
                totalFee: 10,
                attempts: [
                  {
                    status: 'success',
                    dateAttemp: '2016-05-05'
                  }
                ],
                processingFees: {
                  cardFee: 12,
                  cardFeeActual: 21,
                  cardFeeFlat: 12,
                  cardFeeFlatActual: 21,
                  achFee: 12,
                  achFeeActual: 21,
                  achFeeFlat: 12,
                  achFeeFlatActual: 21
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
                  productName: 'productName'
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
    var Connector = require('../core/common/connector')

    var config = {
      url: '/api/v2/commerce/order/list',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }

    var body = inputs.filter

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
