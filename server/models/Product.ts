import { Schema, model, Document, Model } from 'mongoose'

interface IProduct extends Document {
    name: string,
    price: number,
    imageSrcs: string[],
    category: string,
    buyingsQty: number,
    salePercent: number,
    ratingsQty: {
        5: number,
        4: number,
        3: number,
        2: number,
        1: number
    },
    createdAt: number
}

type options = {
    category?: string,
    pricesRange?: number[] | undefined[]
}

interface ProductModel extends Model<IProduct> {
    getList(options: options): any,
    getNewList(options: options): any,
    getTopBuyingList(options: options): any,
    getTopSaleList(options: options): any,
    getTopCategories(): any,
    getTopRatingCategories(): any,
    getCategoryNames(): any,
    getListByName(
        name: string, 
        category: string | undefined
    ): any,
}

const productSchema = new Schema<IProduct, ProductModel>({
    name: String,
    price: Number,
    imageSrcs: [String],
    category: String,
    buyingsQty: Number,
    salePercent: {
        type: Number,
        default: 0
    },
    ratingsQty: {
        5: { type: Number, default: 0 },
        4: { type: Number, default: 0 },
        3: { type: Number, default: 0 },
        2: { type: Number, default: 0 },
        1: { type: Number, default: 0 }
    },
    createdAt: {
        type: Number,
        default: Date.now()
    }
})

productSchema.statics = {
    getList: function(options) {
        const { categories, pricesRange } = options

        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $cond: [
                                { $not: categories.length },
                                { $ne: ['$category', null] },
                                { $in: ['$category', categories] }
                            ]
                        }, {
                            $and: [
                                { $gte: ['$price', pricesRange[0]] },
                                { $lte: ['$price', pricesRange[1]] }
                            ]
                        }
                    ]
                }
            })
            .project({
                name: 1,
                price: 1,
                imageSrc: { $first: '$imageSrcs' },
                category: 1,
                buyingsQty: 1,
                salePercent: 1,
                ratingsQty: 1,
                createdAt: 1
            })
    },
    getNewList: function(
        options
    ) {
        return this.getList(options)
            .sort({ createdAt: -1 })
    },
    getTopBuyingList: function(
        options
    ) {
        return this.getList(options)
            .sort({ buyingsQty: -1 })
    },
    getTopSaleList: function(
        options
    ) {
        return this.getList(options)
            .sort({ salePercent: -1 })
    },
    getTopRatingList: function(
        options
    ) {
        return this.getList(options)
            .project({
                name: 1,
                price: 1,
                imageSrc: { $first: '$imageSrcs' },
                category: 1,
                buyingsQty: 1,
                salePercent: 1,
                ratingsQty: 1,
                createdAt: 1,
                ratings: {
                    $add: ['$ratingsQty.1', '$ratingsQty.2', '$ratingsQty.3', '$ratingsQty.4', '$ratingsQty.5']
                }
            })
            .sort({ ratings: -1 })
    },
    getTopCategories: function() {
        return this.aggregate()
            .group({
                _id: '$category',
                buyingsQty: { $sum: '$buyingsQty' }
            })
            .project({
                category: '$_id',
                buyingsQty: 1
            })
            .lookup({
                from: 'products',
                let: { category: '$category' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$category', '$$category']
                            }
                        }
                    },
                    { $sample: { size: 3 } }, {
                        $project: {
                            name: 1,
                            price: 1,
                            imageSrc: { $first: '$imageSrcs' },
                            category: 1,
                            buyingsQty: 1,
                            salePercent: 1,
                            ratingsQty: 1,
                            createdAt: 1,
                        }
                    }
                ],
                as: 'products'
            })
            .sort({ buyingsQty: -1 })
            .project({
                category: 1,
                products: 1,
                buyingsQty: 1
            })
    },
    getTopRatingCategories: function() {
        return this.aggregate()
            .group({
                _id: '$category'
            })
            .lookup({
                from: 'products',
                let: { category: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$category', '$$category']
                            }
                        }
                    }, {
                        $project: {
                            name: 1,
                            price: 1,
                            imageSrc: { $first: '$imageSrcs' },
                            category: 1,
                            buyingsQty: 1,
                            salePercent: 1,
                            ratingsQty: 1,
                            createdAt: 1,
                            numOfRatings: {
                                $add: [
                                    '$ratingsQty.1',
                                    '$ratingsQty.2',
                                    '$ratingsQty.3',
                                    '$ratingsQty.4',
                                    '$ratingsQty.5',
                                ]
                            }
                        }
                    },
                    { $sort: { numOfRatings: -1 } },
                    { $limit: 1 }
                ],
                as: 'products'
            })
            .replaceRoot({ $first: '$products' })
    },
    getCategoryNames: function() {
        return this.aggregate()
            .group({
                _id: '$category'
            })
            .project({
                category: '$_id'
            })
            .then(docs => docs.map(doc => doc.category))
    },
    getListByName: function(
        name: string, 
        category: string | undefined
    ) {
        console.log('Category: ', category)
        return this.aggregate()
            .match({
                $expr: {
                    $and: [
                        {
                            $regexMatch: {
                                input: '$name',
                                regex: name,
                                options: 'i'
                            }
                        }, {
                            $cond: [
                                { $not: category },
                                true,
                                { $eq: ['$category', category] }
                            ]
                        }
                    ]
                }
            })
            .project({
                name: 1,
                price: 1,
                imageSrc: { $first: '$imageSrcs' },
                category: 1,
                salePercent: 1
            })
    }
}

const Product = model<IProduct, ProductModel>('products', productSchema)

export default Product