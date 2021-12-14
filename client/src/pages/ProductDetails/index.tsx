import React, { useEffect } from 'react'
import { Box, Container, Stack } from '@mui/material'
import ImageGroup from './ImageGroup'
import Description from './Description'
import Comments from './Comments'
import { makeStyles } from '@mui/styles'
import { useAsync } from '../../hooks/useAsync'
import { api } from '../../api/index'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgba(25, 118, 210, 0.04)"
    },
    imageGroup: {
        [theme.breakpoints.only('xs')]: {
            width: "100%",
            order: 2
        },
        [theme.breakpoints.up('sm')]: {
            width: `calc(50% - ${theme.spacing(2)})`
        }
    },
    description: {
        [theme.breakpoints.only('xs')]: {
            width: "100%",
            marginBottom: theme.spacing(3),
            order: 1
        },
        [theme.breakpoints.up('sm')]: {
            width: `calc(50% - ${theme.spacing(2)})`
        }
    },
    comments: {

    }
}))

type Params = {
    id: string
}

const ProductDetails = () => {

    const classes = useStyles()
    const productId = useParams<Params>().id

    const fetchGetProduct = () => {
        return api.get(`/product/${productId}`)
    }

    const getProductDetails = useAsync<{
        product: any
    }>(fetchGetProduct)

    return (
        <Box 
            className={ classes.root }
            py={ 5 }
        >
            <Container>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Box className={ classes.imageGroup }>
                        <ImageGroup 
                            imageSrcs={ 
                                !getProductDetails.isLoading &&  getProductDetails.value
                                    ? getProductDetails.value.product.imageSrcs 
                                    : [] 
                            } 
                        />
                    </Box>
                    <Box className={ classes.description }>
                        { 
                            getProductDetails.value &&
                            getProductDetails.value.product && 
                                <Description {...getProductDetails.value.product} /> 
                        }
                    </Box>
                </Stack>
                <Box className={ classes.comments }>
                    <Comments />
                </Box>
            </Container>
        </Box>
    )
}

export default ProductDetails
