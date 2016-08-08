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
    description: {
      example: 'this is a order description',
      description: 'description of order.',
      required: false
    },
    paymentsPlan: {
      example: [{
        version: 'v2',
        destinationId: 'destinationId',
        email: 'some@email.com',
        dateCharge: '2016-05-05',
        price: 100,
        basePrice: 100,
        originalPrice: 90,
        totalFee: 10,
        feePaidUp: 4.2,
        feeStripe: 3.6,
        paymentId: 'paymentId',
        typeAccount: 'typeAccount',
        account: 'account',
        accountBrand: 'Diners Club',
        last4: '0000',
        discount: 0, // optional default 0
        discountCode: 'discountCode', // optional
        wasProcessed: false, // optional default false
        status: 'pending', // optional default pending
        description: 'some description',
        processingFees: {
          cardFeeActual: 12,
          cardFeeDisplay: 21,
          cardFeeFlatActual: 12,
          cardFeeFlatDisplay: 21,
          achFeeActual: 12,
          achFeeDisplay: 21,
          achFeeFlatActual: 12,
          achFeeFlatDisplay: 21,
          achFeeCapActual: 0.25,
          achFeeCapDisplay: 5
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
        customInfo: {
          formData: {},
          formTemplate: []
        },
        paymentMethods:[]
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
          orderId: 'orderId',
          status: 'pending',
          description: 'description',
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
      description: inputs.description,
      paymentsPlan: inputs.paymentsPlan || []
    }
    // Connector.request(config, params, body, cb)
    Connector.request(config, {}, body, function (err, resp) {
      if (err && err.message.statusCode === 'notAvailable') {
        return exits.notAvailable({
          status: err.status,
          message: err.message.message
        })
      } else if (err) {
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
