import ProductService from '../services/product.service';

class Products{
	constructor(){}

	public async getProducts( req: any, res: any, next: any ){
		const products = await ProductService.getProducts( req.params.id )
			.catch(( err:any ) => next( err ));
		res.send(products);
	}
	
	public async createProducts( req: any, res: any , next: any ){
		const id = await ProductService.createProduct( req.body ).catch(( err:any ) => next( err ));
		const products = await ProductService.getProducts( id ).catch(( err:any ) => next( err ));
		res.send( products );
	}
	
	public async editProducts( req: any, res: any ){
		ProductService.editProduct( req.params.id, req.body )
			.then()
			.catch()
	}
	
	public async removeProducts( req: any, res: any ){
		ProductService.deleteProduct( req.params.id )
			.then()
			.catch()
	}
}

const products = new Products();
export default products;