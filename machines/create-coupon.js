module.exports = {
  friendlyName: 'Crate Coupon',
  description: 'Create a discont coupon',
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
    code : {
      example : 'NEWDISCOUNTCOUPON',
      description : 'Label used to apply discount',
      required : true
    },
    startDate : {
      example : new Date(),
      description : 'Date that allow to know when the coupon started its available.',
      required : true
    },
    endDate : {
      example : new Date(),
      description : 'Date that allow to know when the coupon ended its available.',
      required : true
    },
    percent : {
      example : 10,
      description : 'value in percent to apply on the final order.',
      required : true
    },
    quantity : {
      example : 2,
      description : 'Quantity of coupon is available.',
      required : true
    },
    ProductsId : {
      example : [],
      description : 'array to productsId, this contain a list of products that the coupon is available.',
      required : true
    }
  },


  exits: {

    success: {
      code: 'NEWDISCOUNTCOUPON',
      startDate: "2016-05-05T05:00:00.000Z",
      endDate: "2016-06-06T05:00:00.000Z",
      percent: 10,
      quantity: 2,
      ProductsId: []
    },

  },


  fn: function(inputs, exits) {
    let Connector  = require('../core/common/connector');

    let config = {
      url: '/api/v1/coupon/create',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token//'tdcommerce-secret'
    }

    let body = {
      code: inputs.code,
      startDate: inputs.startDate,
      endDate: inputs.endDate,
      percent: inputs.percent,
      quantity: inputs.quantity,
      ProductsId: inputs.ProductsId
    }

    Connector.request(config, {}, body, function(err, resp){
      if(err){
        return exits.error(err);
      }else{
        return exits.success(resp);
      }
    });
  },



};