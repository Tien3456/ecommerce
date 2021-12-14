import { Schema, model, Document, Model, ObjectId, Types } from 'mongoose'

interface Address extends Document {
    _id: ObjectId,
    name: string,
    addressLine: string,
    phone: string,
    createdAt: number
}

export interface IUser extends Document {
    email: string,
    username: string,
    password: string,
    avatarSrc: string | null,
    addresses: Address[]
}

interface UserModel extends Model<IUser> {
    
}

const addressSchema = new Schema<Address>({
    _id: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId()
    },
    name: String,
    addressLine: String,
    phone: String,
    createdAt: {
        type: Number,
        default: Date.now()
    } 
})

const userSchema = new Schema<IUser, UserModel>({
    email: String,
    username: String,
    password: String,
    avatarSrc: {
        type: String,
        default: null
    },
    addresses: {
        type: [addressSchema],
        default: []
    }
})

userSchema.statics = {
    
}

const User = model<IUser, UserModel>('users', userSchema)

export default User