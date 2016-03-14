module.exports = {
  friendlyName: 'Get Coupon',
  description: 'get a list of discont coupon',
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
      description: 'Array with coupons result',
      example: {
        status: 200,
        body: [{
          code: 'NEWDISCOUNTCOUPON',
          startDate: "2016-05-05",
          endDate: "2016-06-06",
          percent: 10,
          quantity: 2,
          ProductsId: []
        }]
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
      url: '/api/v1/commerce/coupon/list',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token
    }
    var body = inputs.filter

    Connector.request(config, {}, body, function(err, resp){
      if(err){
        return exits.error({
          staus: err.status,
          message: err.body
        });
      }else{
        return exits.success({
          status: resp.status,
          body: resp.body
        });
      }
    });
  },
};