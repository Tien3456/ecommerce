import Product from '../models/Product'
import Favorite from '../models/Favorite'
import { getPricesRange } from '../share/getPricesRange'
import { getUserId } from '../share/getUserId'
import { Types } from 'mongoose'

export const productsController = {
    getProductList: async (req: any, res: any) => {
        let { 
            offset, 
            limit, 
            categories, 
            price, 
            topSaling, 
            topBuying,
            newest 
        } = req.query
        console.log(req.query)

        let getProducts: any // getProducts is a function that return a promise

        const pricesRange = getPricesRange(price)
        const options = {
            categories: !categories ? [] : categories.split(','),
            pricesRange
        }

        switch(true) {
            case Boolean(topSaling):
                getProducts = () => {
                    return Product.getTopSaleList(options)
                }
                break
            case Boolean(newest):
                getProducts = () => {
                    return Product.getNewList(options)
                }
                break
            case Boolean(topBuying):
                getProducts = () => {
                    return Product.getTopBuyingList(options)
                }
                break
            default:
                getProducts = () => {
                    return Product.getList(options)
                        .sort({ name: 1 })
                }
                break
        }
        try {
            const values = await Promise.all([
                getProducts()
                    .skip(parseInt(offset))
                    .limit(parseInt(limit))
                    .then((products: any) => ({ products })),
                getProducts()
                    .count('quantity')
                    .then((docs: any) => ({ quantity: docs.length > 0 ? docs[0].quantity : 0 }))
            ])

            const { products } = values.find(value => value.hasOwnProperty('products'))
            const { quantity } = values.find(value => value.hasOwnProperty('quantity'))
            res.status(200).json({ products, quantity })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getCategories: async (req: any, res: any) => {
        try {
            const categories = await Product.getCategoryNames()
            res.status(200).json({ categories })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getFavoriteProductIds: async (req: any, res: any) => {
        const userId = getUserId(req)
        const { productIds: ids } = req.body
        try {
            const { productIds } = await Favorite.findLikedProductIds(userId, ids)
            res.status(200).json({ favoriteProductIds: productIds })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    },
    getFavoriteProducts: async (req: any, res: any) => {
        const userId = getUserId(req)
        const { offset, limit } = req.query
        
        try {
            const values = await Promise.all([
                Favorite.findLikedProducts(userId, parseInt(offset), parseInt(limit)),
                Favorite.aggregate()
                    .match({ userId: new Types.ObjectId(userId) })
                    .count('favoriteProductsQty')
                    .then(docs => ({ favoriteProductsQty: docs.length > 0 ? docs[0].favoriteProductsQty : 0 }))
            ])
            res.status(200).json(
                values.reduce((obj, value) => {
                    return {
                        ...obj,
                        ...value
                    }
                }, {})
            )
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    }
}