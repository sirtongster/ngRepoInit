(function(){

    angular
        .module('app')
        .factory('validatorFactory', validatorFactory);

    validatorFactory.$inject = [];

    function validatorFactory(){       
        let data = {
            ajaxResponseValidator : ajaxResponseValidator,
            paymentDataValidator : paymentDataValidator
        };
    
        return data;
        /*************************/
        
        function ajaxResponseValidator(data){
			if (data.hasOwnProperty('DataArea')){
				if (data.DataArea.hasOwnProperty('Payment')){
					if (data.DataArea.Payment.ResponseCode === '00'){
						return true;
					}
					return false;
				}
				return false;
			}
			return false;
        }

        function paymentDataValidator(data){

        }
    }
})();