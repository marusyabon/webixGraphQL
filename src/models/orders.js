import mongoose from 'mongoose';
const {Schema} = mongoose;

const OrdersSchema = new Schema({
	userId: String,
	bookId: {type: Schema.Types.ObjectId, ref: 'Book'},
	orderDate: Date,
	returnDate: Date
});

OrdersSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret) {
		ret.id = ret._id;
		delete ret._id;
		delete ret.__v;
	}
});

const Order = mongoose.model('Order', OrdersSchema);

export default Order;