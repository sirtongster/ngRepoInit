(function(){

    angular
        .module('app')
        .factory('getService', getService);

    getService.$inject = ['ajaxService'];

    function getService(ajaxService){
        let global;
        let host = 'http://' + location.host;
        
        let data = {
            getInfo : getInfo,
            getData : getData
        };
    
        return data;
        /*************************/
        
        function getData(callback){
            let obj = {
                url : '',
                method : 'POST',
                data : {},
                happyResponse : (res) => {
                    callback(res);
                },
                unhappyResponse : (err) => {
                    console.log(err);
                }
            };

            return ajaxService.getData(obj);
        }

        function getInfo(){
            // getInfo();
            return global;
        }
    }
})();
