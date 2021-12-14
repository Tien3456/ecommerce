import React from 'react'
import { Box, Typography, Rating, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        '& .price, & .category-name, & .ratings-qty': {
            [theme.breakpoints.up('lg')]: {
                fontSize: "13px",
            },
            [theme.breakpoints.down('lg')]: {
                fontSize: "14px",
            },
            fontWeight: "bold",
            color: theme.customColor.indigo.main,
            textTransform: "capitalize"
        },
        '& .price': {
            color: theme.customColor.tomato.main
        }
    },
    imageWrapper: {
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        overflow: "hidden",
        '& img': {
            objectFit: "cover",
            width: "100%",
            height: "100%"
        }
    },
    overlay: {
        background: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transition: "all 0.3s ease-out",
        webkitTransition: "all 0.3s ease-out",
        mozTransition: "all 0.3s ease-out",
        msTransition: "all 0.3s ease-out",
        oTransition: "all 0.3s ease-out",
        zIndex: 1,
        '&:hover': {
            background: "rgba(0, 0, 0, 0.3)"
        }
    }
}))

interface Props {
    imageSrc: string,
    category: string,
    ratingsQty: {
        1: number,
        2: number,
        3: number,
        4: number,
        5: number
    },
    price: number
}

const TopRatingItem: React.FC<Props> = (props) => {

    const classes = useStyles()

    const numOfRatings = Object.values(props.ratingsQty).reduce((total, el) => {
        return total + el
    }, 0)

    const ratingPercentage = props.ratingsQty['5'] / numOfRatings * 5

    return (
        <Box className={ classes.root }>
            <Stack 
                spacing={ 1 }
                alignItems="center"
            >
                <Box className={ classes.imageWrapper }>
                    <img src={ props.imageSrc } />
                    <Link to={`/products?category=${props.category}`}>
                        <Box className={ classes.overlay }></Box>
                    </Link>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={ 1 }
                >
                    <Rating 
                        value={ ratingPercentage }
                        readOnly
                        precision={ 0.5 }
                        size="small"
                    />
                    <Typography component="span" className="ratings-qty">
                        {
                            numOfRatings / 1000 >= 1
                                ? `(${Math.floor(numOfRatings / 1000)})k`
                                : `(${numOfRatings})`
                        }
                    </Typography>
                </Stack>
                <Typography component="span" className="category-name">
                    { props.category }
                </Typography>
                <Typography component="span" className="price">{ `${props.price}đ` }</Typography>
            </Stack>
        </Box>
    )
}

export default TopRatingItem
