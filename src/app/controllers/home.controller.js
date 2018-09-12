(function(){

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['ProductService'];

	function HomeController(ProductService){
		const vm = this;
		
		// Public Variables
		vm.listOfBanners = [];
		vm.selections = 0;
		// Public Functions
		vm.init = init;
		vm.onSelection = onSelection;

		function init(){
			console.log('init');
			ProductService.getProducts()
				.then( (response) => {
					vm.listOfBanners = response.data;
				});
		}

		function onSelection($event){
			const $banner = angular.element($event.currentTarget);

			if($banner.hasClass('border')){
				vm.selections--;
				$banner.removeClass('border');
			} else {
				vm.selections++;
				$banner.addClass('border');
			};
		}
	}
})();
