module.exports = {
  friendlyName: 'Order Activate',
  description: 'Activate a order by orderId',
  cacheable: false,
  sync: false,

  inputs: {
    baseUrl : {
      example : 'http://localhost:9002',
      description : 'Url microservice.',
      required : true
    },
    token : {
      example : 'TDCommerceToken-CHANGE-ME!',
      description : 'secret word for authenticate microservice.',
      required : true
    },
    orderId : {
      example : "100006",
      description : 'ORDER ID',
      required : true
    },
    userSysId : {
      example : "XXXXXXXXXXX",
      description : 'user id',
      required : true
    }
  },

  exits: {

    success: {
      friendlyName: 'order',
      description: 'order object',
      example: {
          status: 200,
          body: {}
        }
    },

    error: {
      description: 'Some error',
      example: {
        status: 500,
        message: '[{"maybe some JSON": "like this"}]  (but could be any string)'
      }
    }

  },

  fn: function(inputs, exits) {
    var Connector  = require('../core/common/connector');

    var config = {
      url: '/api/v3/commerce/order/activate',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token
    };

    Connector.request(config, {}, {
      userSysId: inputs.userSysId,
      orderId: inputs.orderId
    }, function(err, resp){
      if(err){
        return exits.error({
          status: err.status,
          message: err.body
        });
      }else{
        return exits.success({
          status: resp.status,
          body: resp.body
        });
      }
    });
  }
};