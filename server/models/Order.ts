import { Schema, model, Document, Model, ObjectId } from 'mongoose'

interface IOrder {
    orderId: typeof Schema.Types.ObjectId,
    userId: typeof Schema.Types.ObjectId,
    productId: typeof Schema.Types.ObjectId,
    category: string,
    quantity: number,
    boughtAt: number,
    status: string
}

interface OrderModel extends Model<IOrder> {

}

const orderSchema = new Schema<IOrder, OrderModel>({
    orderId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId,
    category: String,
    quantity: Number,
    boughtAt: Number,
    status: {
        type: String,
        enum: ['delivering', 'delivered', 'returned', 'canceled'],
        default: "delivering"
    }
})

const Order = model<IOrder, OrderModel>('orders', orderSchema)

export default Order