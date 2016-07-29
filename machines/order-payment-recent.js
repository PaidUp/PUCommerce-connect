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
        body: [
          {
            _id: 'xxx',
            userId: '5644f60936c2f71c22b69267',
            orderId: '100000',
            description: 'description',
            paymentsPlan: {
              _id: 'id',
              customInfo: {
                formData: {},
                formTemplate: []
              },
              beneficiaryInfo: {
                beneficiaryName: "Joceline",
                beneficiaryId: "N/A"
              }, userInfo: {
                userName: 'other name test last',
                userId: '5644f60936c2f71c22b69267'
              },
              productInfo: {
                organizationImage: 'http://virtual:8888/media/catalog/product/n/t/ntxbanditos.png',
                organizationLocation: 'Springfield, MA',
                organizationName: 'Isotopes Baseball',
                organizationId: 'acct_17vBpJHXmwMXUx1q',
                productImage: 'http://virtual:8888/media/catalog/product/n/t/ntxbanditos_2.png',
                productName: '14U',
                productId: '111'
              },
              paysFees: {
                collections: true,
                processing: true
              },
              collectionsFee: {
                feeFlat: 0,
                fee: 5
              },
              processingFees: {
                achFeeFlatDisplay: 0,
                achFeeFlatActual: 0,
                achFeeDisplay: 0,
                achFeeActual: 0,
                cardFeeFlatDisplay: 0.3000000000000000,
                cardFeeFlatActual: 0.3000000000000000,
                cardFeeDisplay: 2.8999999999999999,
                cardFeeActual: 2.8999999999999999,
                achFeeCapActual: 0.25,
                achFeeCapDisplay: 5
              },
              description: 'Payment In Full',
              last4: '1111',
              accountBrand: 'Visa',
              account: 'card_176RghCi3y1KZk9uuWFxXsZq',
              typeAccount: 'card',
              paymentId: 'cus_7L7wdnf5rQkIrO',
              feeStripe: 44.21,
              feePaidUp: 70,
              totalFee: 114.21,
              originalPrice: 1400,
              basePrice: 546,
              price: 1514.28,
              dateCharge: 'Tue Apr 19 2016 19:00:00 GMT-0500 (COT)',
              email: 'cogollo1987@yahoo.es',
              destinationId: 'acct_16N29JCSxGRWBMDD',
              attempts: [{
                transferId: 'tr_182SGFCi3y1KZk9uKhC8LYx4',
                accountBrand: 'Visa',
                last4: '1111',
                message: 'done',
                status: 'succeeded',
                dateAttemp: '2016-04-20T20:49:24.152Z',
                _id: '5717eb54c8138dcf6de107ea'
              }],
              status: 'succeeded',
              wasProcessed: true,
              discountCode: '',
              discount: 0
            },
            status: 'complete'
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
  },

  fn: function (inputs, exits) {
    var Connector = require('../core/common/connector')
    var config = {
      url: '/api/v3/commerce/order/recent/' + inputs.userId + '/' + inputs.limit,
      baseUrl: inputs.baseUrl,
      method: 'get',
      token: inputs.token
    }
    Connector.request(config, {}, {}, function (err, resp) {
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
