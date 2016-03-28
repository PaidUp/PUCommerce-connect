module.exports = {
  friendlyName: 'Order Create',

  description: 'Create a order',

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
      description: 'userId to own order.',
      required: true
    },
    paymentsPlan: {
      example: [{
        destinationId: 'destinationId',
        email: 'some@email.com',
        dateCharge: '2016-05-05',
        price: 100,
        originalPrice: 90,
        totalFee: 10,
        paymentId: 'paymentId',
        typeAccount: 'typeAccount',
        account: 'account',
        last4: '0000',
        discount: 0, // optional default 0
        discountCode: 'discountCode', // optional
        wasProcessed: false, // optional default false
        status: 'pending', // optional default pending
        description: 'some description',
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
      }],
      description: 'paymentsPlan to own order.',
      required: true
    }
  },

  exits: {
    success: {
      friendlyName: 'order created',
      description: 'oder created',
      example: {
        status: 200,
        body: {
          _id: 'IdOrder',
          status: 'pending',
          paymentsPlan: []
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

  fn: function (inputs, exits
  /**/
  ) {
    var Connector = require('../core/common/connector')
    var config = {
      url: '/api/v2/commerce/order/create',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }
    var body = {
      userId: inputs.userId,
      paymentsPlan: inputs.paymentsPlan || []
    }
    // Connector.request(config, params, body, cb)
    Connector.request(config, {}, body, function (err, resp) {
      if (err && err.message.statusCode === 'notAvailable') {
        return exits.notAvailable({
          status: err.status,
          message: err.message.message
        })
      }else if (err) {
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
  },
}
