import Product from '../models/Product'
import Favorite from '../models/Favorite'
import Comment from '../models/Comment'
import User from '../models/User'
import { getUserId } from '../share/getUserId'
import { Types } from 'mongoose'

export const productController = {
    getProductDetails: async (req: any, res: any) => {
        const productId = req.params.id
        
        try {
            const product = await Product.findById(productId)

            if(product) {
                return res.status(200).json({ product })
            }
            res.status(404).json({ msg: 'Not found' })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getComments: async (req: any, res: any) => {
        const productId = req.params.id
        const { offset, limit } = req.query
        
        try {
            const values = await Promise.all([
                Comment.getCommentsQty(productId),
                Comment.findByProductId(productId, parseInt(offset), parseInt(limit))
            ])
            res.status(200).json(
                values.reduce((response, value) => {
                    return {
                        ...response,
                        ...value
                    }
                }, {})
            )
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    postComment: async (req: any, res: any) => {
        const userId = getUserId(req)
        const productId = req.params.id

        const { text } = req.body

        try {
            const newComment = new Comment({
                userId,
                productId,
                text,
                createdAt: Date.now()
            })

            const newDoc = await newComment.save()
            const user = await User.findById(userId)

            if(user) {
                const { userId: senderId, ...rest } = newDoc.toObject()
                console.log(rest)

                return res.status(200).json({
                    comment: {
                        ...rest,
                        sender: {
                            _id: user._id,
                            avatarSrc: user.avatarSrc,
                            username: user.username
                        }
                    }
                })
            }

            res.status(401).json({ msg: 'Authorization' })

        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    likeProduct: async (req: any, res: any) => {
        const userId = getUserId(req)
        const productId = req.params.id

        try {
            const doc = await Favorite.findByUserId(userId, productId)

            if(doc) {
                await Favorite.unlikeProduct(userId, productId)
                return res.status(200).json({ isContacted: true })
            }
            
            const newFavorite = new Favorite({
                userId: new Types.ObjectId(userId),
                productId: new Types.ObjectId(productId)
            })
            await newFavorite.save()
            res.status(200).json({ isContacted: true })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    }
}