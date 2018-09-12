import mongoose  from 'mongoose';

class EntityManager {
	
	public connection(){
		return new Promise((resolve, reject)=>{
			mongoose.connect('');
	
			let db = mongoose.connection;
			db.on('error', (e:any) => {
				console.error.bind(console, 'connection error:')
				reject(e);
			});
			db.once('open', () => {
				resolve;
			});
		})
	}
	
	constructor(){
		this.connection().then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch((err:any) => {
			console.error('Unable to connect to the database:', err);
		});       
	}
}

export default new EntityManager().connection;