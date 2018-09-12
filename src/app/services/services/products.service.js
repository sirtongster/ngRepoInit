(function(){

	angular
		.module('app')
		.factory('ProductService', ProductService);

	ProductService.$inject = ['$http', 'validatorFactory'];

	function ProductService($http, validatorFactory){
		let logger = "";
		
		let host = `${ window.location.protocol }//${ window.location.host }`;
		
		let data = {
			getProducts : getProducts
		};

		return data;
		/*************************/
		function getProducts(){
			const url = `${ host }/api/products`;

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
  }
})();
