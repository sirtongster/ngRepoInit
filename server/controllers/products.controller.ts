class Products{
	public data: any;

	constructor(){}

	public getProducts( req: any, res: any ){
		res.send({
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
					"description": "At volutpat diam ut venenatis. At quis risus sed vulputate odio ut enim. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin" },
			
				{
					"id": 4,
					"author" : "John Connors", 
					"status": "REVIEW",
					"description": "Quis eleifend quam adipiscing vitae proin sagittis nisl. Malesuada fames ac turpis egestas maecenas pharetra convallis. Non blandit massa enim nec dui. Amet mauris commodo quis imperdiet massa"
				}
			]
		});
	}
	
	public createProducts( req: any, res: any ){
		
	}
	
	public editProducts( req: any, res: any ){
		
	}
	
	public removeProducts( req: any, res: any ){
		
	}
}

const products = new Products();
export default products;