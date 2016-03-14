module.exports = {
    friendlyName: 'Create Coupon',
    description: 'Create a discount coupon',
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
            example : "2016-05-05",
            description : 'Date that allow to know when the coupon started its available. Format YYYY-MM-DD',
            required : true
        },
        endDate : {
            example : "2016-06-06",
            description : 'Date that allow to know when the coupon ended its available. Format YYYY-MM-DD',
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
        productsId : {
            example : ['someProductId'],
            description : 'array to productsId, this contain a list of products that the coupon is available.',
            required : true
        }
    },

    exits: {

        success: {
            friendlyName: 'then',
            description: 'Object created',
            example: {
                status: 201,
                body: {
                    code: 'NEWDISCOUNTCOUPON',
                    startDate: "2016-05-05",
                    endDate: "2016-06-06",
                    percent: 10,
                    quantity: 2,
                    ProductsId: ['someProducId']}
            }
        },
        error: {
            description: 'Some error',
            example: {
                status: 400,
                message: '[{"maybe some JSON": "like this"}]  (but could be any string)'
            }
        }


    },


    fn: function(inputs, exits) {
        var Connector  = require('../core/common/connector');

        var config = {
            url: '/api/v1/commerce/coupon/create',
            baseUrl: inputs.baseUrl,
            method: 'post',
            token : inputs.token
        }

        var body = {
            code: inputs.code,
            startDate: inputs.startDate,
            endDate: inputs.endDate,
            percent: inputs.percent,
            quantity: inputs.quantity,
            productsId: inputs.productsId
        }

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
    },

};