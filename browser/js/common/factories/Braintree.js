app.factory('Braintree', function ($http) {

	var getToken = function (amount) {

		var nonceReceived = function (event, nonce) {

			var data = {
				amount: amount,
				payment_method_nonce: nonce
			};

			return $http.post('http://localhost:1337/api/braintree/process', data)
			.then(function (response) {
				console.log('back from nonceReceived\n', response.data);
			})

		};

		return $http.get('http://localhost:1337/api/braintree/token')
		.then(function (response) {

		  console.log('in Braintree; response:\n',response.client_token);

		  braintree.setup(response.client_token, 'dropin', {
		    container: 'checkout',
		    paymentMethodNonceReceived: nonceReceived
		 });
	});//end getToken


	return {
		getToken: getToken
	};

	};
});
