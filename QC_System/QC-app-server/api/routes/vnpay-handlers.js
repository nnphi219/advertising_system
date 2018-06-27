const { VNPay } = require('vn-payments');

/* eslint-disable no-param-reassign */
const TEST_CONFIG = VNPay.TEST_CONFIG;
const vnpay = new VNPay({
	paymentGateway: TEST_CONFIG.paymentGateway,
	merchant: TEST_CONFIG.merchant,
	secureSecret: TEST_CONFIG.secureSecret,
});

exports.checkoutVNPay = function(req, res, next) {
	const checkoutData = res.locals.checkoutData;

	checkoutData.returnUrl = `http://${req.headers.host}/payment/vnpay/callback`;
	checkoutData.orderInfo = 'Thanh toán hóa đơn chạy chiến dịch quảng cáo';
	checkoutData.orderType = 'digital content';

	vnpay.buildCheckoutUrl(checkoutData).then(checkoutUrl => {
		res.locals.checkoutUrl = checkoutUrl;
		next(checkoutUrl);
		// return checkoutUrl;
	});
}

exports.callbackVNPay = function(req, res) {
	const query = req.query;
	console.log(query);
	return vnpay.verifyReturnUrl(query).then(results => {
		console.log(results);
		if (results) {
			res.locals.email = 'tu.nguyen@naustud.io';
			res.locals.orderId = results.transactionId || '';
			res.locals.price = results.amount;
			res.locals.isSucceed = results.isSuccess;
			res.locals.message = results.message;
		} else {
			res.locals.isSucceed = false;
		}
	});
}
