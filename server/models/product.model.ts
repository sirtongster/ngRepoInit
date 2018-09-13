import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

mongoose.connect('mongodb://localhost/mydb');

const product = new Schema({
	id: {
		type: ObjectId,
		required: true,
		index: true
	},
	author: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
})

class Product{
	constructor(){
		
	}
}

export default mongoose.model('Product', product);