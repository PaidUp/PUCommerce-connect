module.exports = {
  friendlyName: 'Order Add Payments',
  description: 'Add dues to order',
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
    orderId: {
      example: 'orderId',
      description: 'order that you want add payment.',
      required: true
    },
    paymentsPlan: {
      example: [{
        destinationId: 'destinationId',
        dateCharge: '2016-05-05',
        price: 100,
        typeAccount: 'typeAccount',
        account: 'account',
        discount: 0, // optional default 0
        discountCode: 'discountCode', // optional
        wasProcessed: false, // optional default false
        status: 'pending', // optional default pending
        last4: '0000',
        originalPrice: 90,
        totalFee: 10,
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
      }],
      description: 'array of payments plan',
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
          _id: 'IdOrder',
          status: 'processing',
          paymentsPlan: [{
            destinationId: 'destinationId',
            dateCharge: '2016-05-05',
            price: 100,
            typeAccount: 'typeAccount',
            account: 'account',
            discount: 0,
            discountCode: 'discountCode',
            wasProcessed: false,
            status: 'pending',
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
      url: '/api/v2/commerce/order/add-payments',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }

    var body = {
      orderId: inputs.orderId,
      paymentsPlan: inputs.paymentsPlan
    }

    Connector.request(config, {}, body, function (err, resp) {
      if (err) {
        return exits.error({
          status: err.status,
          message: err.body
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
