(function(){

	angular
		.module('app')
		.controller('ErrorController', ErrorController);

	ErrorController.$inject = ['OSBService', '$location'];

	function ErrorController(OSBService, $location){
		const vm = this;
		
		// Public Variables
		vm.data = {
			message: `<h3>Psss.. No se pudo realizar el pago!</h3>
								<p>Probá de nuevo más tarde.</p>`
		};
		// Public Functions
		vm.init = init;

		function init(){
			vm.data.message = $location.search().data;
			OSBService.status('error');
		}
	}
})();
