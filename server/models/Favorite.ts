import { Document, Schema, ObjectId, Types, Model, model } from 'mongoose'

interface IFavorite extends Document {
    userId: ObjectId,
    productId: ObjectId,
    createdAt: number
}

interface FavoriteModel extends Model<IFavorite> {
    findByUserId(userId: string, productId: string): any,
    unlikeProduct(userId: string, productId: string): any,
    findLikedProductIds(userId: string, productId: string): any,
    findLikedProducts(userId: string, offset: number, limit: number): any
}

const favoriteSchema = new Schema<IFavorite, FavoriteModel>({
    userId: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId,
    createdAt: {
        type: Number,
        default: Date.now()
    }
})

favoriteSchema.statics = {
    findByUserId: function(
        userId: string,
        productId: string
    ) {
        return this.findOne({
            $expr: {
                $and: [
                    { $eq: [{ $toString: '$userId' }, userId] },
                    { $eq: [{ $toString: '$productId' }, productId] }
                ]
            }
        })
    },
    unlikeProduct: function(
        userId: string,
        productId: string
    ) {
        return this.deleteOne({
            $expr: {
                $and: [
                    { $eq: [{ $toString: '$userId' }, userId] },
                    { $eq: [{ $toString: '$productId' }, productId] }
                ]
            }
        })
    },
    findLikedProductIds: function(userId: string, productIds: string) {
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        { $eq: [{ $toString: '$userId' }, userId] },
                        {
                            $in: [
                                { $toString: '$productId' },
                                productIds
                            ]
                        }
                    ]
                }
            })
            .then(docs => {
                if(docs.length > 0) {
                    return { productIds: docs.map(doc => doc.productId) }
                }
                return { productIds: [] }
            })
    },
    findLikedProducts: function(
        userId: string,
        offset: number,
        limit: number
    ) {
        return this.aggregate()
            .match({
                $expr: {
                    $eq: [{ $toString: '$userId' }, userId]
                }
            })
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(limit)
            .group({
                _id: '$userId',
                productIds: {
                    $push: '$productId'
                }
            })
            .lookup({
                from: 'products',
                let: { productIds: '$productIds' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ['$_id', '$$productIds']
                            }
                        }
                    }
                ],
                as: 'products'
            })
            .project({
                products: {
                    $map: {
                        input: '$products',
                        as: 'product',
                        in: {
                            _id: '$$product._id',
                            name: '$$product.name',
                            price: '$$product.price',
                            imageSrc: { $first: '$$product.imageSrcs' },
                            category: '$$product.category',
                            buyingsQty: '$$product.buyingsQty',
                            salePercent: '$$product.salePercent',
                            ratingsQty: '$$product.ratingsQty',
                            createdAt: '$$product.createdAt',
                            isLiked: true
                        }
                    }
                }
            })
            .then(docs => {
                let favoriteProducts: any = []
                if(docs.length > 0) {
                    favoriteProducts = docs[0].products
                }
                return { favoriteProducts }
            })
    }
}

const Favorite = model<IFavorite, FavoriteModel>('favorites', favoriteSchema)

export default Favorite