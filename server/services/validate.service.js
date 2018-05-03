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
			switch(info.Payment.ResponseCode){
				case "00":
					return true;
					break;
				default: return false;
			}
		} else if( info.errorCode ) {
			switch( info.errorCode ){
				case "0":
					return true;
					break;
				default: return false;
			}
		} else if( info.code ) {
			return true;
			// switch( info.code ){
			// 	case "0":
			// 		return true;
			// 		break;
			// 	default: return false;
			// }
		}
		return false;
	}
};

export default validate;