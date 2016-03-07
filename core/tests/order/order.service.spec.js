var test = require('tape');
var orderService = require('../../services/order/order.service');
//https://github.com/aghassemi/tap-xunit

/*test.skip('order test', function (t) {
	orderService.test(function(err, data){
		t.equal(err, null);
        t.equal(data, true);
		console.log('err', err)
		console.log('data', data)
		t.end()
	})
});*/

test('order create', function (t) {
	orderService.create({'data':'data'}, function(err, data){
		t.equal(err, null);
        t.equal(data.jesse, 'cogollo')
		t.end()
	})
});