import React, { useCallback } from 'react'
import CartItem from './CartItem'
import { Box, Stack, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import {
    useAppSelector as useSelector,
    useAppDispatch as useDispatch
} from '../../redux/hooks'
import { actions } from '../../redux/cart/actions'

const useStyles = makeStyles((theme: any) => ({
    '@keyframes move-to-left': {
        '0%': {
            transform: "translateX(100%)",
            webkitTransform: "translateX(100%)",
            mozTransform: "translateX(100%)",
            msTransform: "translateX(100%)",
            oTransform: "translateX(100%)"
        },
        '100%': {
            transform: "translateX(0)",
            webkitTransform: "translateX(0)",
            mozTransform: "translateX(0)",
            msTransform: "translateX(0)",
            oTransform: "translateX(0)"
        }
    },
    root: {
        position: "absolute",
        background: "rgb(255, 255, 255)",
        right: 0,
        top: 0,
        height: "100%",
        animation: "$move-to-left 0.3s ease-out",
        [theme.breakpoints.up('lg')]: {
            width: "30%",
        },
        [theme.breakpoints.down('lg')]: {
            width: "40%",
        }
    },
    cartHeader: {
        borderBottom: "1px solid #c5c5c5",
        '& span': {
            color: theme.customColor.indigo.main,
            opacity: 0.9,
            fontWeight: "bold",
            fontSize: "15px"
        },
        '& .cart-icon': {
            opacity: 0.9
        }
    },
    btnsWrapper: {
        '& .btn-checkout': {
            background: theme.customColor.tomato.main,
            color: "#fff",
            fontWeight: "bold",
            textTransform: "capitalize",
            '&:hover': {
                background: theme.palette.error.main,
                color: "#fff"
            }
        },
        '& .btn-link': {
            border: `1px solid ${theme.customColor.tomato.main}`,
            color: theme.customColor.tomato.main,
            textTransform: "capitalize"
        }
    }
}))

const CartModal = () => {

    const dispatch = useDispatch()
    const classes = useStyles()

    const cartItems = useSelector(state => state.cart)
    const totalPrice = cartItems.reduce((total, item) => {
        return total + (item.quantity * item.currentPrice)
    }, 0)

    const decreaseItem = useCallback((_id) => {
        dispatch(actions.doDecreaseItemFromCart(_id))
    }, [])
    
    const addItem = useCallback((item) => {
        dispatch(actions.doAddItemToCart(item))
    }, [])

    const removeItem = useCallback((_id) => {
        dispatch(actions.doRemoveItemFromCart(_id))
    }, [])

    return (
        <Box className={ classes.root }>
            <Stack 
                direction="row"
                sx={{ height: "8%", px: 2 }}
                alignItems="center"
                spacing={ 1 }
                className={ classes.cartHeader }
            >
                <ShoppingBagOutlinedIcon className="cart-icon" />
                <Typography component="span">
                    { cartItems.length } items
                </Typography>
            </Stack>
            <Box 
                sx={{ 
                    height: cartItems.length > 0 ? `${100 - 23}%` : `${100 - 8}%`,
                    overflow: "auto"
                }}
            >
                {
                    cartItems.map((item) => (
                        <Box  
                            key={ item._id } 
                            sx={{ 
                                height: "25%",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <CartItem 
                                isOnModal={ true }
                                _id={ item._id }
                                name={ item.name }
                                currentPrice={ item.currentPrice }
                                imageSrc={ item.imageSrc }
                                quantity={ item.quantity }
                                addItem={() => addItem(item)}
                                decreaseItem={() => decreaseItem(item._id)}
                                removeItem={() => removeItem(item._id)}
                            />
                        </Box>
                    ))
                }
                {
                    cartItems.length === 0 &&
                        <Stack
                            sx={{ height: "100%", color: "text.disabled" }}
                            alignItems="center"
                            justifyContent="center"
                            spacing={ 1 }
                        >
                            <img src="/images/shopping-bag.svg" />
                            <Typography 
                                component="span" 
                                sx={{ fontSize: "13px", fontWeight: "bold" }}
                            >
                                Your shopping bag is empty
                            </Typography>
                            <Typography 
                                component="span" 
                                sx={{ fontSize: "13px", fontWeight: "bold" }}
                            >
                                Start shopping
                            </Typography>
                        </Stack>
                }
            </Box>
            {
                cartItems.length > 0 &&
                    <Box 
                        sx={{ height: "15%", px: 2 }}
                        className={ classes.btnsWrapper }
                    >
                        <Stack
                            justifyContent="center"
                            sx={{ height: "100%" }}
                            spacing={ 1 }
                        >
                            <Button className="btn-checkout">Checkout now ({ totalPrice }đ)</Button>
                            <Button href="/cart" className="btn-link">View cart</Button>
                        </Stack>
                    </Box>
            }
        </Box>

    )
}

export default CartModal
