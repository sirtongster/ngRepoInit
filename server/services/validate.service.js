import logger from '../services/log.service.js';
import { resolve } from 'dns';
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
		console.log(info);
		if (info.Payment){
			if(info.Payment.ResponseCode == "00"){
				logger.debug(info, { title: 'contenido del servicio' });
				return true;
			}
		} else if( info.hasOwnProperty(errorCode)) {
			if( info.errorCode == "0" ){
				logger.debug(info, { title: 'contenido del servicio' });
				return true;
			}
		} else if( info.hasOwnProperty(code)) {
			if( info.code == "0" ){
				logger.debug(info, { title: 'contenido del servicio' });
				return true;
			}
		} else if( info.hasOwnProperty(statusCode)) {
			if( info.statusCode == 0 ){
				logger.debug(info, { title: 'contenido del servicio' });
				return true;
			}
		} else {
			logger.warn(info, { title: 'contenido del servicio' });
			return false;
		}
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
	},
	toFloat : ( value ) => {
		if( value.length === 12 ){
			return parseFloat(value) / 100;
		} else {
			return "error";
		}
	}
};

export default validate;