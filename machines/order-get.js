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
    orderId: {
      example: 'orderId',
      description: 'orderId filter to retrieve orders',
      required: false
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
    },
    sort: {
      example: 1,
      description: '1 or -1',
      required: false
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
            {
              _id: 'IdOrder',
              orderId: 'orderId',
              status: 'processing',
              userId: 'userId',
              description: 'description',
              totalPrice: 1000,
              createAt: 'someDate',
              paymentsPlan: [{
                version: 'v2',
                destinationId: 'destinationId',
                _id: '_idpp',
                description: 'some description',
                email: 'email@email.com',
                dateCharge: '2016-05-05',
                price: 100,
                basePrice: 100,
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
                paymentId: 'paymentId',
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
                beneficiaryInfo: {
                  beneficiaryName: "Joceline",
                  beneficiaryId: "N/A"
                },
              }]
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

  fn: function (inputs, exits) {
    var Connector = require('../core/common/connector')

    var config = {
      url: '/api/v2/commerce/order/list',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }

    var body = {
      orderId: inputs.orderId,
      userId: inputs.userId,
      limit: inputs.limit,
      sort: inputs.sort
    }

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
