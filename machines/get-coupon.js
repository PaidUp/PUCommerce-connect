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
      example : 'secret-word',
      description : 'secret word for authenticate microservice.',
      required : true
    },
    filter : {
      example : {
        code: 'NEWDISCOUNTCOUPON'
      },
      description : 'It is a object that contain the key value to filters the list coupons. if you want a complete list os coupon send a empty object {}',
      required : false
    }
  },


  exits: {

    success: [{
      code: 'NEWDISCOUNTCOUPON',
      startDate: "2016-05-05T05:00:00.000Z",
      endDate: "2016-06-06T05:00:00.000Z",
      percent: 10,
      quantity: 2,
      ProductsId: []
    }],

  },


  fn: function(inputs, exits) {
    let Connector  = require('../core/common/connector');

    let config = {
      url: '/api/v1/coupon/list',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token//'tdcommerce-secret'
    }
    let filter = (typeof inputs.filter === "object") ? inputs.filter : {}

    Connector.request(config, {}, filter, function(err, resp){
      if(err){
        return exits.error(err);
      }else{
        return exits.success(resp);
      }
    });
  },



};