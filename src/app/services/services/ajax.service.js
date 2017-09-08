(function (){

	angular
		.module('app')
		.factory('ajaxService',ajaxService);
	
	ajaxService.$inject = ['$http'];

	function ajaxService($http){
		let globalData;
		
		let data = {
			getData: getData
		};
		
		return data;
		
		/*************************/

		function getData(obj){

			return $http({
				url : obj.url,
				method: obj.method || 'POST',
				header : {
					'Accept' : 'application/json',
					'Content-Type': 'application/json'
				},
				data: obj.data,
				timeout: obj.timeout || 0
			})
			.then(success)
			.catch(failure)
			.finally(always);

			function success(res) {
				globalData = res.data;
				wrongPromiseCatcher(globalData);

				///////////////////

				function wrongPromiseCatcher(globalData){
					if(globalData.ReturnType === 'Error'){
						obj.unhappyResponse(globalData);
					} else if(globalData.ReturnType === 'Warning'){
						obj.unhappyResponse(globalData);
					} else {
						obj.happyResponse(globalData);
					}

				}
			}

			function failure(err){
				globalData = err;
				obj.unhappyResponse(globalData);
			}

			function always(){
				console.log(globalData);
			}
		}
	}

})();
