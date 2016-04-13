module.exports = {
  friendlyName: 'get orders to charge',
  description: 'get orders to charge (cronjob)',
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
              orderId: 'orderId',
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
                paymentId: 'paymentId',
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
                  productName: 'productName',productImage: 'someUrl',
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
    var Connector = require('../core/common/connector')

    var config = {
      url: '/api/v2/commerce/order/cronjob',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }

    Connector.request(config, {}, {}, function (err, resp) {
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
