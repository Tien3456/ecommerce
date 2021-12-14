import { useState, useEffect } from 'react'
import { useAppSelector as useSelector } from '../redux/hooks'
import { useAsync } from './useAsync'
import { api } from '../api/index'
import { stat } from 'fs'

export interface Product {
    _id: string,
    imageSrc: string,
    name: string,
    price: number,
    ratingsQty: {
        1: number,
        2: number,
        3: number,
        4: number,
        5: number
    },
    salePercent: number
}

export const useFavoriteProducts = (productsFromStore: Product[]) => {
    
    const [products, setProducts] = useState<Product[]>([])
    const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([])
    const { authenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if(Array.isArray(productsFromStore)) {
            setProducts(productsFromStore)
        }
    }, [productsFromStore])

    const getFavoriteProducts = useAsync<{ favoriteProductIds: string[] }>(() => {
        return api.post('/products/favorite-product-ids', {
            productIds: products.map(product => product._id)
        })
    }, false)

    useEffect(() => {
        if(authenticated && products.length > 0) {
            getFavoriteProducts.execute()
        }
    }, [authenticated, products])
    
    useEffect(() => {
        if(getFavoriteProducts.value) {
            setFavoriteProductIds(getFavoriteProducts.value.favoriteProductIds)
        }
    }, [getFavoriteProducts.value])

    return {
        products,
        favoriteProductIds,
        setFavoriteProductIds
    }
}