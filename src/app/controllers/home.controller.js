(function(){

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = [];

	function HomeController(){
		const vm = this;
		
		// Public Variables
		vm.listOfBanners = [
			{
				url: '../assets/img/foro_romano.jpg',
				title: "Title",
				content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a cumque id. Aliquid, facilis. Ut in placeat laboriosam quae, quia quo sint a incidunt qui! Repellat ut aut veritatis maiores?"
			},
			{
				url: '../assets/img/foro_romano.jpg',
				title: "Title 2",
				content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a cumque id. Aliquid, facilis. Ut in placeat laboriosam quae, quia quo sint a incidunt qui! Repellat ut aut veritatis maiores?"
			},
			{
				url: '../assets/img/foro_romano.jpg',
				title: "Title 3",
				content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab a cumque id. Aliquid, facilis. Ut in placeat laboriosam quae, quia quo sint a incidunt qui! Repellat ut aut veritatis maiores?"
			}
		];
		// Public Functions
		vm.init = init;

		function init(){
			
		}
	}
})();
