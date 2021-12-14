import React from 'react'
import { Box, Stack, Typography, Rating, Button } from '@mui/material'
import { useStyles } from './styles/Description'
import { useAppDispatch as useDispatch } from '../../redux/hooks'
import { actions as cartActions } from '../../redux/cart/actions'

interface Props {
    _id: string,
    imageSrcs: string[],
    name: string,
    category: string,
    price: number,
    ratingsQty: { [key: string]: number },
    salePercent: number
}

const Description: React.FC<Props> = (props) => {
    
    const classes = useStyles()
    const dispatch = useDispatch()

    let ratingsQty = Object.values(props.ratingsQty).reduce((qty, rating) => {
        return qty + rating
    }, 0)

    const ratingPercent = props.ratingsQty['5'] / ratingsQty * 5

    const currentPrice = props.price - props.price * (props.salePercent / 100)

    const addItemToCart = () => {
        const item = {
            _id: props._id,
            name: props.name,
            imageSrc: props.imageSrcs[0],
            currentPrice,
            quantity: 1
        }
        dispatch(cartActions.doAddItemToCart(item))
    }

    return (
        <Stack 
            spacing={ 2 } 
            className={ classes.root }
        >
            <Typography className="name">{ props.name.toLowerCase() }</Typography>
            <Stack 
                direction="row"
                alignItems="center"
            >
                <Typography className="title" sx={{ color: "text.disabled" }}>
                    Brand: &nbsp;
                </Typography>
                <Typography className="value">{ props.category }</Typography>
            </Stack>
            <Stack 
                direction="row"
                alignItems="center"
            >
                <Typography className="title" sx={{ color: "text.disabled" }}>
                    Rated: &nbsp;
                </Typography>
                <Rating value={ ratingPercent } />
                <Typography className="value">&nbsp;({ ratingsQty })</Typography>
            </Stack>
            <Typography className="price">{ currentPrice }đ</Typography>
            <Box>
                <Button 
                    className="btn-text"
                    onClick={ addItemToCart }
                >
                    Add to cart
                </Button>
            </Box>
            <Typography className="description">
                <Typography component="span" sx={{ color: "text.disabled" }}>
                    Description:&nbsp;
                </Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto vel odio ab? Qui numquam iure quod optio perferendis quo laboriosam sequi ex veritatis possimus beatae, autem non amet voluptate provident ipsa laborum distinctio, modi commodi? Quam in blanditiis ipsam ducimus dolorem natus et corporis, nobis consequatur dolore vel quis unde.
                </Typography>
        </Stack>
    )
}

export default Description
