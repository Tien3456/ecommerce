import User from '../models/User'
import { Types } from 'mongoose'
import { getUserId } from '../share/getUserId'

export const userController = {
    getUserInfo: async (req: any, res: any) => {
        const userId = getUserId(req)
        if(!userId) {
            return res.status(401).json({ msg: 'Authorization' })
        }
        try {
            const user = await User.findById(userId).lean()
            if(user) {
                const { password, ...rest } = user
                res.status(200).json({ ...rest })
            }
            res.status(400).json({ msg: 'Not found' })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getAddresses: async (req: any, res: any) => {
        const userId = getUserId(req)

        if(!userId) {
            return res.status(401).json({ msg: 'Authorization' })
        }

        try {
            const user = await User.findById(userId)
            if(user) {
                return res.status(200).json({
                    addresses: user.addresses
                })
            }
            res.status(404).json({ msg: 'Not found' })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    updateAddress: async (req: any, res: any) => {

        const userId = getUserId(req)
        
        if(!userId) {
            return res.status(401).json({ msg: 'Authorization' })
        }

        const { type, addressId, newAddress } = req.body

        switch(type) {
            case 'add':
                try {
                    const user = await User.findById(userId)
                    if(user) {
                        if(user.addresses.length >= 5) {
                            return res.status(200).json({
                                isUpdated: false
                            })
                        }
                        newAddress._id = new Types.ObjectId()
                        const info = await User.updateOne(
                            { _id: new Types.ObjectId(userId) },
                            { $push: { addresses: newAddress } }
                        )
                        console.log(info)
                        return res.status(200).json({
                            isUpdated: true,
                            newAddress
                        })
                    }
                    res.status(404).json({ msg: 'Not found' })
                } catch(err) {
                    console.log(err)
                    res.status(500).json({ msg: 'Error' })
                }
                break
            case 'update':
                try {
                    await User.updateOne(
                        { _id: new Types.ObjectId(userId) },
                        { $set: { 'addresses.$[elem]': newAddress } },
                        { arrayFilters: [{ 'elem._id': new Types.ObjectId(addressId) }] }
                    )
                    res.status(200).json({
                        isUpdated: true,
                        newAddress
                    })
                } catch(err) {
                    console.log(err)
                    res.status(500).json({ msg: 'Error' })
                }
                break
            default:
                break
        }
    },
    deleteAddress: async (req: any, res: any) => {
        const userId =  getUserId(req)
        const { addressId } = req.params

        try {
            const info = await User.updateOne(
                { _id: new Types.ObjectId(userId) },
                { $pull: { addresses: { _id: new Types.ObjectId(addressId) } } }
            )
            info.matchedCount > 0
                ? res.status(200).json({
                    isUpdated: true
                })
                : res.status(200).json({
                    isUpdated: false
                })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    }
}