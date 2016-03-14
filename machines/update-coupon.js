module.exports = {


  friendlyName: 'Update Coupon',


  description: 'Update a coupon discount',


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
      example: '*',
      description : 'It is a object that contain the key value to filters the coupons',
      required : true
    },
    data : {
      example: '*',
      description : 'It is a object that contain the key value to filters the list coupons. if you want a complete list os coupon send a empty object {}',
      required : true
    }

  },


  exits: {
    success: {
      friendlyName: 'then',
      description: '',
      example: {
        "ok": 1,
        "nModified": 1,
        "n": 1
      }
    },
    error: {
      description: 'Some error',
      example:{
        staus: 500,
        message: '[{"maybe some JSON": "like this"}]  (but could be any string)'
      }
    }
  },


  fn: function(inputs, exits
    /**/
  ) {
    var Connector  = require('../core/common/connector');

    var config = {
      url: '/api/v1/commerce/coupon/update',
      baseUrl: inputs.baseUrl,
      method: 'put',
      token : inputs.token
    }
    var body = {
      filter: inputs.filter,
      data: inputs.data
    }

    Connector.request(config, {}, body, function(err, resp){
      if(err){
        return exits.error({
          status: err.staus,
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