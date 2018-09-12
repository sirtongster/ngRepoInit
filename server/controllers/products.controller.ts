import ProductService from '../services/product.service';

class Products{
	constructor(){}

	public async getProducts( req: any, res: any, next: any ){
		const products = await ProductService.getProducts( req.params.id )
			.catch(( err:any ) => next( err ));
		res.send(products);
	}
	
	public async createProducts( req: any, res: any ){
		ProductService.createProduct(req.body)
			.then( response => {
				res.send( response );
			})
			.catch( err => {
				res.status('500');
				res.send( err );
			})
	}
	
	public async editProducts( req: any, res: any ){
		ProductService.editProduct(req.body)
			.then()
			.catch()
	}
	
	public async removeProducts( req: any, res: any ){
		ProductService.deleteProduct( req.body )
			.then()
			.catch()
	}
}

const products = new Products();
export default products;