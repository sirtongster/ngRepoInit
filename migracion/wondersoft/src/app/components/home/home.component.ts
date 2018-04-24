import { Component, OnInit } from '@angular/core';
import { OSBService } from '../../services/osb.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  cardInfo:CardInfo;
  isIE:boolean = null;

  constructor(
    private osb: OSBService,
    private deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {
    this.isIE = ( this.deviceService.browser === 'MSIE' ) ? true : false;
    console.log(this.isIE); 
  }

  enviar( e:any ){
    e.stopPropagation();
			this.osb.registroDePagoWS({
				cvc 		    : (parseInt(this.cardInfo.cvc)) 			  ? this.cardInfo.cvc 			  : "",
				cuotas 		  : (parseInt(this.cardInfo.cuotas))	 	  ? this.cardInfo.cuotas 		  : "",
				nroTarjeta 	: (parseInt(this.cardInfo.nroTarjeta)) 	? this.cardInfo.nroTarjeta 	: "",
				vencimiento : (parseInt(this.cardInfo.vencimiento)) ? this.cardInfo.vencimiento : ""
			}, ( data:{} ) => {
        
			});
  }
}

export interface CardInfo{
  cvc:string,
  cuotas:string,
  nroTarjeta:string,
  vencimiento:string
}
