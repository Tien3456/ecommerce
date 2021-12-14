import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { 
    Box, Paper, Stack, Typography, 
    Rating, Chip, IconButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { makeStyles } from '@mui/styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { actions as cartActions } from '../redux/cart/actions'
import { 
    useAppDispatch as useDispatch,
    useAppSelector as useSelector
} from '../redux/hooks'
import { Link, useHistory } from 'react-router-dom'
import { api } from '../api/index'
import { useAsync } from '../hooks/useAsync'
import { useFavoriteProducts } from '../hooks/useFavoriteProducts'

const useStyles = makeStyles((theme: any) => ({
    root: {
        position: "relative",
        padding: theme.spacing(1),
        '& a': {
            display: "block",
            pointerEvents: (props: { isAbleToLink: boolean }) => props.isAbleToLink ? "auto" : "none",
            '& img': {
                width: "100%",
                objectFit: "cover",
                cursor: "pointer",
                aspectRatio: "1 / 1"
            }
        },
        '& .name-wrapper': {
            width: "100%",
            '& p': {
                color: theme.customColor.indigo.dark,
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: "bold",
                maxWidth: "80%",
                maxHeight: "3rem",
                lineHeight: "1.5rem",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }
        },
        '& .price-wrapper': {
            [theme.breakpoints.up('sm')]: {
                flexDirection: "row"
            },
            '& span': {
                fontSize: "14px",
                fontWeight: "bold",
                '&.current-price': {
                    color: theme.customColor.tomato.main,
                    marginRight: "5px"
                },
                '&:not(.current-price)': {
                    textDecoration: "line-through"
                }
            }
        },
        '& .sale-percent': {
            background: theme.customColor.tomato.main,
            position: "absolute",
            top: theme.spacing(1),
            left: theme.spacing(1),
            zIndex: 1,
            color: "#fff",
            fontWeight: "bold",
            fontSize: "11px",
            height: "27px",
            '& .MuiChip-label': {
                opacity: 0.9
            }
        },
        '& .contact-wrapper': {
            display: "none",
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            zIndex: 1,
            '& button': {
                padding: "5px",
            },
            '& .contact-icon': {
                color: theme.customColor.indigo.main
            }
        },
        '&:hover .contact-wrapper': {
            display: "block"
        },
        '& .cart-btns-wrapper': {
            position: "absolute",
            bottom: theme.spacing(1),
            right: theme.spacing(1),
            '& span.items-qty': {
                fontSize: "14px",
                color: theme.customColor.indigo.main,
                opacity: 0.9
            },
            '& .btn-wrapper': {
                border: `1px solid ${theme.customColor.tomato.light}`,
                borderRadius: "5px",
                padding: "10px",
                width: "25px",
                height: "25px",
                '&:hover': {
                    border: `1px solid ${theme.customColor.tomato.main}`
                },
                '& .remove-icon, & .add-icon': {
                    color: theme.customColor.tomato.main
                }
            }
        }
    }
}))

export interface Props {
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
    isAbleToLink?: boolean,
    isLiked?: boolean,
    setFavoriteProductIds?: Dispatch<SetStateAction<any>>
}

const ProductItem: React.FC<Props> = (props) => {

    const classes = useStyles({
        isAbleToLink: props.isAbleToLink
    })
    const dispatch = useDispatch()
    const history = useHistory()
    
    let currentPrice = props.price - (props.salePercent * props.price / 100)
    const ratingsQty = Object.values(props.ratingsQty).reduce((total, el) => {
        return total + el
    }, 0)
    const ratingPercentage = props.ratingsQty['5'] / ratingsQty * 100 * (5 / 100)

    const [selectedItemsQty, setSelectItemsQty] = useState<number>(0)
    const { authenticated } = useSelector(state => state.auth)

    const likeProduct = useAsync<{ isContacted: boolean }>(() => {
        return api.get(`/product/${props._id}/like`)
    }, false)

    useEffect(() => {
        if(likeProduct.value && props.setFavoriteProductIds) {
            props.setFavoriteProductIds((prevProductIds: string[]) => {
                const index = prevProductIds.indexOf(props._id)
                index === -1
                    ? prevProductIds.push(props._id)
                    : prevProductIds.splice(index, 1)
                return [...prevProductIds]
            })
        }
    }, [likeProduct.value])

    const handleClickLikeButton = () => {
        if(authenticated) {
            likeProduct.execute()
            return
        }
        history.push({
            pathname: '/signin',
            state: {
                from: window.location.href
                            .replace(window.location.origin, "")
            }
        })
    }

    const selectItem = () => {
        const item = {
            _id: props._id,
            name: props.name,
            imageSrc: props.imageSrc,
            currentPrice,
            quantity: 1
        }
        dispatch(cartActions.doAddItemToCart(item))
        setSelectItemsQty(prevQty => prevQty + 1)
    }
    const removeItem = () => {
        dispatch(cartActions.doDecreaseItemFromCart(props._id))
        setSelectItemsQty(prevQty => prevQty === 0 ? prevQty : prevQty - 1)
    }

    return (
        <Paper className={ classes.root }>
            <Stack sx={{ width: "100%" }}>
                <Box className="img-wrapper" mb={ 1 }>
                    <Link 
                        to={`/product/${props._id}`}
                        draggable={ false }
                    >
                        <img 
                            width="100%" src={ props.imageSrc } 
                            draggable="false"
                        />
                    </Link>
                </Box>
                <Box className="name-wrapper" mb={ 1 }>
                    <Typography>
                        { props.name }
                    </Typography>
                </Box>
                <Box className="rating-wrapper" mb={ 1 }>
                    <Rating
                        value={ratingPercentage} 
                        precision={0.5}
                        size="small"
                        readOnly 
                    />
                </Box>
                <Stack className="price-wrapper">
                    <Typography component="span" className="current-price">
                        { currentPrice }đ
                    </Typography>
                    {
                        props.salePercent !== 0 &&
                            <Typography 
                                component="span" 
                                sx={{ color: "text.disabled" }}
                            >
                                { props.price }
                            </Typography>
                    }
                </Stack>
                <Chip 
                    label={`${props.salePercent}% off`} 
                    className="sale-percent"
                />
                <Box className="contact-wrapper">
                    <Stack>
                        <IconButton>
                            <VisibilityIcon 
                                fontSize="small"
                                className="contact-icon" 
                            />
                        </IconButton>
                        <IconButton 
                            onClick={ handleClickLikeButton }
                            disabled={ likeProduct.isLoading }
                        >
                            {
                                !props.isLiked
                                    ? <FavoriteBorderOutlinedIcon 
                                        fontSize="small" 
                                        className="contact-icon"
                                    />
                                    : <FavoriteIcon 
                                        fontSize="small"
                                        color="error"
                                    />
                            }
                        </IconButton>
                    </Stack>
                </Box>
                <Box className="cart-btns-wrapper">
                    <Stack alignItems="center">
                        {
                            selectedItemsQty !== 0 &&
                            <>
                                <IconButton 
                                    className="btn-wrapper"
                                    onClick={ removeItem }
                                >
                                    <RemoveIcon className="remove-icon" fontSize="small" />
                                </IconButton>
                                <Typography component="span" className="items-qty">
                                    { selectedItemsQty }
                                </Typography>
                            </>
                        }
                        <IconButton 
                            className="btn-wrapper"
                            onClick={ selectItem }
                        >
                            <AddIcon className="add-icon" fontSize="small" />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    )
}

export default ProductItem
