import React, { useCallback } from 'react'
import BuyingStepper from '../../components/BuyingStepper'
import CartItem from './CartItem'
import VoucherForm from './VoucherForm'
import AddressForm from './AddressForm'
import { Box, Container, Stack, Paper, Typography, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { 
    useAppSelector as useSelector,
    useAppDispatch as useDispatch
} from '../../redux/hooks'
import { actions } from '../../redux/cart/actions'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgba(25, 118, 210, 0.04)",
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(3)
    },
    cartItemsWrapper: {
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "68%"
        }
    },
    checkoutGroup: {
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "30%"
        }
    }
}))

const Cart = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    
    const cartItems = useSelector(state => state.cart)

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.currentPrice
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
            <Container>
                <BuyingStepper />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Box className={ classes.cartItemsWrapper }>
                        {
                            cartItems.map((item) => (
                                <Box 
                                    key={ item._id }
                                    mb={ 2 }
                                >
                                    <CartItem 
                                        {...item} 
                                        isOnModal={ false }
                                        addItem={() => addItem(item)}
                                        removeItem={() => removeItem(item._id)}
                                        decreaseItem={() => decreaseItem(item._id)}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                    <Box className={ classes.checkoutGroup }>
                        <Paper elevation={ 0 } sx={{ p: 2 }}>
                            <Stack 
                                spacing={ 2 }
                                divider={<Divider orientation="horizontal" flexItem />}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Typography 
                                        component="span"
                                        sx={{
                                            fontWeight: "bold",
                                            fontSize: "13px",
                                            opacity: 0.7
                                        }}
                                    >
                                        Total
                                    </Typography>
                                    <Typography 
                                        component="span"
                                        sx={{
                                            fontWeight:"bold",
                                            fontSize: "14px"
                                        }}
                                    >
                                        { totalPrice }đ
                                    </Typography>
                                </Stack>
                                <VoucherForm />
                                <AddressForm cartItemsQty={ cartItems.length } />
                            </Stack>
                        </Paper>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Cart