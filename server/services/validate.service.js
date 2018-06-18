let validate = {
	_date :	(date, time) =>{
		// TODO: Validación de parametros de entrada (date : DD/MM/AA && time : HHMMSS)
		date = date.split("/").reverse();
		date[0] = '20'+date[0];
		date = date.join('-');
		time = time.match( /.{1,2}/g ).join(':');
		return date+'T'+time;
	},
	payment : (info) => {
		let response;
		if (info.Payment && info.Payment.ResponseCode){
			if(info.Payment.ResponseCode === "00"){
				return true;
			}
		} else if( info.errorCode ) {
			if( info.errorCode === "0" ){
				return true;
			}
		} else if( info.code ) {
			if( info.code === "0" ){
				return true;
			}
		}
		return false;
	},
	isAnulment : (info) => {
		return ( info.TIPOOPERACION !== "C") ? true : false;
	},
	isEmptyObject : (obj) => {
		for (var key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				return false;
			}
		}
		return true;
	}
};

export default validate;