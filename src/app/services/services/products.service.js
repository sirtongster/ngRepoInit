(function(){

	angular
		.module('app')
		.factory('ProductService', ProductService);

	ProductService.$inject = ['$http', 'validatorFactory'];

	function ProductService($http, validatorFactory){
		let logger = "";
		
		let host = `${ window.location.protocol }//${ window.location.host }`;
		
		let data = {
			getProducts : getProducts,
			createProduct : createProduct
		};

		return data;
		/*************************/
		function getProducts(){
			const url = `${ host }/api/product/`;

			return new Promise( (resolve, reject) => {
				$http.get(url)
				.then(( res ) => {
					logger = res;
					resolve( res );
				})
				.catch(( e ) => {
					logger = e;
					reject( e );
				})
				.finally(() => {
					console.log(logger);
				});
			})
		}

		function createProduct(){
			const url = `${ host }/api/product/`;

			return new Promise( (resolve, reject) => {
				$http.post(url, {
					id: 5,
					author: "Jose Canseco",
					status: "REVIEW",
					description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
				})
				.then(( res ) => {
					logger = res;
					resolve( res );
				})
				.catch(( e ) => {
					logger = e;
					reject( e );
				})
				.finally(() => {
					console.log(logger);
				});
			})
		}
  }
})();
