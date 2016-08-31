module.exports = {
  friendlyName: 'Report revenue projection',
  description: 'revenue projection report',
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
    filter : {
      example : "*",
      description : 'It is a object that contain the key value to filters the list coupons. if you want a complete list os coupon send a empty object {}',
      required : false
    }
  },

  exits: {

    success: {
      friendlyName: 'then',
      description: 'results of report',
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
      url: '/api/v1/commerce/reports/revenue/projections',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token
    };

    var body = inputs.filter;

    Connector.request(config, {}, body, function(err, resp){
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