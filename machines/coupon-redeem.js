module.exports = {


  friendlyName: 'Coupon-Redeem',


  description: 'Redeem a coupon discount',


  cacheable: false,


  sync: false,

  inputs: {
    baseUrl : {
      example : 'http://localhost:9002',
      description : 'Url microservice.',
      required : true
    },
    token : {
      example : 'secret-word',
      description : 'secret word for authenticate microservice.',
      required : true
    },
    coupon : {
      example: 'NEWDISCOUNTCOUPON',
      description : 'It is a object that contain the key value to filters the coupons',
      required : true
    },
    productId : {
      example: 'Id1',
      description : 'It is a object that contain the key value to filters the list coupons. if you want a complete list os coupon send a empty object {}',
      required : true
    }

  },


  exits: {

    success: {
      friendlyName: 'then',
      description: 'Object with id coupon and discount percent',
      example: {
        status: 200,
        body : {
          _id: 'NEWDISCOUNTCOUPON',
          percent: 10
        }
      }
    },
    error: {
      description: 'error unexpected',
      example: {
        status: 500,
        message : '[{"maybe some JSON": "like this"}]  (but could be any string)'
      }
    },
    notAvailable: {
      description: 'Currently coupon is not available',
      example: {
        status: 400,
        message: 'this coupon is not available'
      }
    }
  },


  fn: function(inputs, exits
    /**/
  ) {
    var Connector  = require('../core/common/connector');

    var config = {
      url: '/api/v1/commerce/coupon/redeem',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token
    }

    var body = {
      coupon: inputs.coupon,
      productId: inputs.productId
    }

    Connector.request(config, {}, body, function(err, resp){
      if(err && err.message.statusCode === 'notAvailable'){
        return exits.notAvailable({
          status: err.status,
          message: err.message.message
        });
      }else if(err){
        return exits.error({
          status: err.status,
          message: err.body
        });
      }else{
        console.log('resp.body',resp.body);

        return exits.success({
          status : resp.status,
          body : resp.body
        });
      }
    });
  },
};