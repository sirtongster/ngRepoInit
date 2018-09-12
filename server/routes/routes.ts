import express from 'express';
import api from '../controllers/products.controller';

class Router{
	private routes: any;
	
	constructor(){}

	public init(express: any) {
		this.routes = express.Router();

		this.routes.route('/product/:id?')
			.get(api.getProducts)
			.post(api.createProducts)
			.put(api.editProducts)
			.delete(api.removeProducts);
	}

	public getRoutes(){
		return this.routes;
	}
}

const router = new Router();
export default router;