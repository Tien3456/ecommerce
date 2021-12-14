import Product from '../models/Product'
import { getPricesRange } from '../share/getPricesRange'

export const homeController = {
    getTopCategories: async (req: any, res: any) => {
        try {
            const products = await Product.getTopCategories()
            res.status(200).json({ products })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: "Server didn't responding" })
        }
    },
    getTopRatingCategories: async (req: any, res: any) => {
        try {
            const products = await Product.getTopRatingCategories()
            res.status(200).json({ products })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: "Server didn't responding" })
        }
    },
    searchProducts: async (req: any, res: any) => {
        let { name, category, offset, limit } = req.query

        if(!category) {
            category = undefined
        }

        try {
            if(parseInt(offset) === 0) {
                const values = await Promise.all([
                    Product.getListByName(name, category)
                        .sort({ name: 1 })
                        .skip(parseInt(offset))
                        .limit(parseInt(limit))
                        .then((products: any) => ({ products })),
                    Product.getListByName(name, category)
                        .count('quantity')
                        .then((products: any) => products.length > 0 ? ({ quantity: products[0].quantity }) : ({ quantity: 0 }))
                ])
                console.log(values)

                const { products } = values.find(value => value.hasOwnProperty('products'))
                const { quantity } = values.find(value => value.hasOwnProperty('quantity'))

                return res.status(200).json({ products, quantity })
            }

            const products = await Product.getListByName(name, category)
                                        .sort({ name: 1 })
                                        .skip(parseInt(offset))
                                        .limit(parseInt(limit))
            res.status(200).json({ products })

        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: "Error" })
        }
    }
}