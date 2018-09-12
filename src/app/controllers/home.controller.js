(function(){

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['ProductService'];

	function HomeController(ProductService){
		const vm = this;
		
		// Public Variables
		vm.listOfBanners = [];
		vm.selections;
		// Public Functions
		vm.init = init;

		function init(){
			console.log('init');
			ProductService.getProducts()
				.then( (response) => {
					vm.listOfBanners = response.data.items;
				});
		}

		function onSelection(){
			
		}
	}
})();
