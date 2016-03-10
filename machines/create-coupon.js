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
    }

  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits
    /**/
  ) {
    let Connector  = require('../core/common/connector');

    return exits.success();
  },



};