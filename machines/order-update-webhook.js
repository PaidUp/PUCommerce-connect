module.exports = {
  friendlyName: 'update order from webhook',
  description: 'update order from webhook',
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
    data: {
      example: {},
      description: 'data from webhook',
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
                  organizationImage: 'someUrl',
                  transactionDescription: "transactionDescription"
                },
                userInfo: {
                  userId: 'UserId',
                  userName: 'userName'
                },
                customInfo: {
                  formData: {},
                  formTemplate: []
                },
                beneficiaryInfo: {}
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
      url: '/api/v2/commerce/order/update-webhook',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }

    Connector.request(config, {}, inputs.data, function (err, resp) {
    	console.log('resp.body', resp.body)
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
