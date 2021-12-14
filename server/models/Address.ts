import { Document, Schema, model, Model } from 'mongoose'

const { ObjectId } = Schema.Types

export interface IAddress extends Document {
    userId: typeof ObjectId,
    name: string,
    addressLine: string,
    phone: string,
    createdAt: Number
}

interface AddressModel extends Model<IAddress> {

}

const addressSchema = new Schema<IAddress, AddressModel>({
    userId: ObjectId,
    name: String,
    addressLine: String,
    phone: String,
    createdAt: {
        type: Number,
        default: Date.now()
    }
})

addressSchema.statics = {

}

const Address = model<IAddress, AddressModel>('addresses', addressSchema)

export default Address