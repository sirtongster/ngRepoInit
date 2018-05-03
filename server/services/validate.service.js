let validate = {
	_date :	(date, time) =>{
		// TODO: Validación de parametros de entrada (date : DD/MM/AA && time : HHMMSS)
		date = date.split("/").reverse();
		date[0] = '20'+date[0];
		date = date.join('-');
		time = time.match( /.{1,2}/g ).join(':');
		return date+'T'+time;
	},
	ws_response : (info) => {
		let reponse;
		if (info.Payment.ResponseCode){
			switch(info.Payment.ResponseCode){
				case "00":
					response = true;
					break;
				default: response = false;
			}
		} else {
			
		}
		return false;
	}
};

export default validate;