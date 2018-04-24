import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OSBService {

  host:string = `${ window.location.protocol }//${ window.location.host }`;

  constructor( public httpClient: HttpClient ) {
    console.log('Servicio listo para usar');
  }

  registroDePagoWS( cardInfo: any, callback: Function ){
    let url = `${ this.host }/pago/pagoWS`;
    let body = {
      "CodSeguridad" 		 : (cardInfo.cvc) 						 ? cardInfo.cvc 						 : "648",
      "Cuotas" 					 : (cardInfo.cuotas) 					 ? cardInfo.cuotas 					 : "01",
      "NroTarjeta" 			 : (cardInfo.nroTarjeta) 			 ? cardInfo.nroTarjeta 			 : "4507990000977787",
      "FechaVencimiento" : (cardInfo.vencimiento) 		 ? cardInfo.vencimiento 		 : "1905",
      "TipoAutorizacion" : (cardInfo.tipoautorizacion) ? cardInfo.tipoautorizacion : "",
    }
    
    return this.httpClient.post(url, body)
    .map( (resp: any) => {
      return resp;
    })
  }

  registroDePagoOPEN(){
    let url = `${ this.host }/pago/pagoOPEN`;

    return this.httpClient.get(url)
    .map( (resp: any) => {
      return resp;
    })
		
  }
  
  anulacionDePagoWS(){
    let url = `${ this.host }/pago/pagoWS`;

    return this.httpClient.delete(url)
    .map( (resp: any) => {
      return resp;
    })

  }

  anulacionDePagoOPEN(){
    let url = `${ this.host }/pago/pagoOPEN`;

    return this.httpClient.delete(url)
    .map( (resp: any) => {
      return resp;
    })
    
  }

  cambioDeEstado( status:string ){
    let url = `${ this.host }/pago/cambioDeEstado`;

    return this.httpClient.post(url, { status })
    .map( (resp: any) => {
      return resp;
    })
  
  }
}
