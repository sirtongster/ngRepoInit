export class ValidateService{
	constructor(){}

	date( date: any, time: any ){
		// TODO: Validación de parametros de entrada (date : DD/MM/AA && time : HHMMSS)
		date = date.split("/").reverse();
		date[0] = '20'+date[0];
		date = date.join('-');
		time = time.match( /.{1,2}/g ).join(':');
		return date+'T'+time;
	}

	wsResponse( res: any ){
		if (res.hasOwnProperty('Payment')){
			if (res.Payment.ResponseCode === '00'){
				return true;
			}
			return false;
		}
		return false;
	}
}

export default ValidateService;