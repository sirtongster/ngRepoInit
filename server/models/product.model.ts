import mongoose from 'mongoose';
import { ObjectId } from 'bson';

const product = new mongoose.Schema({
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