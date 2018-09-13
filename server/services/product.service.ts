import { IProductItem, IItemsEntity } from '../interfaces/product.interface';

class ProductService{
	public data: IProductItem = {
		"total": 4,
		"items": [
			{ 
				"id": 1,
				"author": "Ali Connors",
				"status": "REVIEW",
				"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
			},
			{
				"id": 2,
				"author": "John Doe", 
				"status": "REVIEW",
				"description": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{ 
				"id": 3,
				"author": "Ali Doe", 
				"status": "REVIEW",
				"description": "At volutpat diam ut venenatis. At quis risus sed vulputate odio ut enim. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin"
			},
			{
				"id": 4,
				"author" : "John Connors", 
				"status": "REVIEW",
				"description": "Quis eleifend quam adipiscing vitae proin sagittis nisl. Malesuada fames ac turpis egestas maecenas pharetra convallis. Non blandit massa enim nec dui. Amet mauris commodo quis imperdiet massa"
			}
		]
	}
	public list: IItemsEntity[] = [];

	constructor(){}

	public getProducts( id?: number ): Promise<boolean>{
		return new Promise((resolve: any, reject: any) => {
			if( id ){
				this.list.push(this.findProductById( this.data, id));
			} else {
				this.list = this.data.items;
			}
			resolve(this.list);
		});
	}

	public createProduct( product: IItemsEntity ): Promise<boolean>{
		return new Promise((resolve: any, reject: any) => {
			
			// Persistencia de datos

			console.log('Producto creado correctamente con Id: 5');
			console.log( product );
			resolve(5);
		});
	}

	public editProduct ( id: number, attributes: IItemsEntity ): Promise<boolean>{
		return new Promise((resolve: any, reject: any) => {
			// Persistencia de datos
		});
	}

	public deleteProduct( id: number ): Promise<boolean>{
		return new Promise((resolve: any, reject: any) => {
			// Persistencia de datos
		});
	}

	private findProductById( obj: any, id: number ): any{
		let result = null;
		if(obj instanceof Array) {
			for(let i = 0; i < obj.length; i++) {
				result = this.findProductById( obj[i], id );
				if (result) {
					break;
				}   
			}
		} else {
			for(let prop in obj) {
				if(prop == 'id') {
					if(obj[prop] == id) {
						return obj;
					}
				}
				if(obj[prop] instanceof Object || obj[prop] instanceof Array) {
					result = this.findProductById( obj[prop], id );
					if (result) {
						break;
					}
				} 
			}
		}
		return result;
	}
}

export default new ProductService;