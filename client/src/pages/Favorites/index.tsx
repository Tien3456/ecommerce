import React, { useState, useEffect, useMemo } from 'react'
import { Box, CircularProgress, useTheme } from '@mui/material'
import ProductItem from '../../components/ProductItem'
import Pagination from '../../shared/components/Pagination'
import { useStyles } from './styles/index'
import { api } from '../../api/index'
import { useAsync } from '../../hooks/useAsync'
import { useLocation } from 'react-router-dom'

interface Product {
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
    salePercent: number,
    isLiked?: boolean,
}

const Favorites = () => {

    const theme: any = useTheme()
    const classes = useStyles()
    const location = useLocation()
    const limit = 12

    const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([])
    const [favoriteProductsQty, setFavoriteProductsQty] = useState<number>(1)

    const getFavoriteProducts = useAsync<{ 
        favoriteProducts: Product[],
        favoriteProductsQty: number
    }>(() => {
        let page = 1
        const pageQuery = new URLSearchParams(location.search).get('page')
        if(typeof(pageQuery) === 'string' && Number.isInteger(parseInt(pageQuery))) {
            page = parseInt(pageQuery)
        }
        if(page === 0) {
            page = 1
        }
        const offset = page * limit - limit
        return api.get(`/products/favorite?offset=${offset}&limit=${limit}`)
    }, false)

    useEffect(() => {
        getFavoriteProducts.execute()
    }, [location])
 
    useEffect(() => {
        if(getFavoriteProducts.value) {
            setFavoriteProductIds(getFavoriteProducts.value.favoriteProducts.map((product: any) => {
                return product._id
            }))
            setFavoriteProductsQty(getFavoriteProducts.value.favoriteProductsQty)
        }
    }, [getFavoriteProducts.value])

    return (
        <Box className={ classes.root }>
            <Box 
                className="grid-container"
                sx={{
                    minHeight: getFavoriteProducts.isLoading
                        ? "80vh"
                        : "auto",
                    mb: theme.spacing(8)
                }}
            >
                {
                    getFavoriteProducts.value &&
                    getFavoriteProducts.value.favoriteProducts.filter(product => favoriteProductIds.includes(product._id))
                                                              .map(product => (
                        <Box key={ product._id }>
                            <ProductItem
                                {...product} 
                                isAbleToLink={ true }
                                setFavoriteProductIds={ setFavoriteProductIds }
                            />
                        </Box>
                    ))
                }
                {
                    getFavoriteProducts.isLoading &&
                        <CircularProgress size={ 30 } />
                }
            </Box>
            <Box
                sx={{ 
                    position: "absolute",
                    bottom: theme.spacing(4),
                    left: "50%",
                    transform: "translateX(-50%)"
                }}
            >
                <Pagination 
                    count={ Math.ceil(favoriteProductsQty / limit) }
                    disabled={ getFavoriteProducts.isLoading }
                />
            </Box>
        </Box>
    )
}

export default Favorites