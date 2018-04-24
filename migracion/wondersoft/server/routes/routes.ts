import { Router, Request, Response, NextFunction } from 'express';
import api from '../components/payment.component';

export class PagoRouter{
	router: Router;

	constructor(){
		this.router = Router();
		this.init();
	}

	init(){
		this.router.route('/solicitudDePago')
		.post(api.solicitudDePago);

		this.router.route('/pagoWS')
		.post(api.registroDePagoWS)
		.delete(api.anulacionDePagoWS);

		this.router.route('/pagoOPEN')
		.get(api.registroDePagoOPEN)
		.delete(api.anulacionDePagoOPEN);
	}
}