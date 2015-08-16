// jshint devel:true
"use strict";

braintree.setup("CLIENT-TOKEN-FROM-SERVER", "paypal", {
	container: "paypal-container",
	onPaymentMethodReceived: function onPaymentMethodReceived(obj) {
		doSomethingWithTheNonce(obj.nonce);
	}
});
//# sourceMappingURL=main.js.map
