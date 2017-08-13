module.exports = {
  friendlyName: 'Order update Payment',
  description: 'update payments to order',
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
    userSysId: {
      example: 'userSysId',
      description: 'user invoke update',
      required: true
    },
    orderId: {
      example: 'orderId',
      description: 'order ID',
      required: true
    },
    paymentPlanId: {
      example: 'paymentPlanId',
      description: 'payment Id',
      required: true
    },
    paymentPlan: {
      example: {
        destinationId: 'destinationId',
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
        attempts: '*'
      },
      description: 'object of payments plan',
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
          orderId: 'orderId',
          status: 'processing',
          userId: 'userId',
          description: 'description',
          createAt: '2016-05-05',
          updateAt: '2016-05-05',
          paymentsPlan: [{
            _id: 'someId',
            invoiceId: 'INV-XXXXXX',
            version: 'v2',
            destinationId: 'destinationId',
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
              organizationImage: 'someUrl',
              statementDescriptor: "statementDescriptor"
            },
            userInfo: {
              userId: 'UserId',
              userName: 'userName'
            },
            beneficiaryInfo: {
              beneficiaryName: "Joceline",
              beneficiaryId: "N/A"
            },
            customInfo: {
              formData: {},
              formTemplate: []
            },
            paymentMethods: []
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
      url: '/api/v2/commerce/order/update-payments',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token: inputs.token
    }

    var body = {
      orderId: inputs.orderId,
      paymentPlanId: inputs.paymentPlanId,
      paymentPlan: inputs.paymentPlan,
      userSysId: inputs.userSysId
    }

    Connector.request(config, {}, body, function (err, resp) {
      if (err) {
        return exits.error({
          status: err.status,
          message: JSON.stringify(err)
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
