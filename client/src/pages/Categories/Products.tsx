import React from 'react'
import { Box, Paper, Stack, CircularProgress } from '@mui/material'
import ProductItem, { Props as Product } from '../../components/ProductItem'
import { useStyles } from './styles/Products'
import { useAppSelector as useSelector } from '../../redux/hooks'
import { useFavoriteProducts } from '../../hooks/useFavoriteProducts'

const Products = () => {

    const classes = useStyles()

    const { products } = useSelector(state => state.categories)

    const {
        products: items,
        favoriteProductIds,
        setFavoriteProductIds
    } = useFavoriteProducts(products.list)

    return (
        <Box className={ classes.root }>
            {
                products.isLoading
                    ? <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            position: "absolute",
                            width: 1,
                            height: 1
                        }}
                    >
                        <CircularProgress className="loading-icon" size={ 30 } />
                    </Stack>
                    : <>
                    {
                        items.map((product: Product) => (
                                <Box key={ product._id }>
                                    <ProductItem
                                        isAbleToLink={ true }
                                        isLiked={
                                            Boolean(favoriteProductIds.find(id => id === product._id))
                                        }
                                        setFavoriteProductIds={ setFavoriteProductIds }
                                        {...product}
                                    />
                                </Box>
                            ))
                        }
                    </>
            }
        </Box>
    )
}

export default Products
