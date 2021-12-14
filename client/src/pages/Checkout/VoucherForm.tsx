import React from 'react'
import { Paper, Box, Typography, Stack, Divider, OutlinedInput, Button } from '@mui/material'
import { useStyles } from './styles/VoucherForm'
import { useAppSelector as useSelector } from '../../redux/hooks'

const VoucherForm = () => {

    const classes = useStyles()

    const cartItems = useSelector(state => state.cart)

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.currentPrice
    }, 0)

    return (
        <Paper
            elevation={ 0 }
            sx={{ p: 2 }}
            className={ classes.root }
        >
            <Stack 
                spacing={ 2 }
                divider={<Divider orientation="horizontal" flexItem />}
            >
                <Stack spacing={ 2 }>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ color: "text.disabled" }}
                    >
                        <Typography className="title">Subtotal:</Typography>
                        <Typography className="value">{ totalPrice }đ</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ color: "text.disabled" }}
                    >
                        <Typography className="title">Shipping:</Typography>
                        <Typography className="value">-</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ color: "text.disabled" }}
                    >
                        <Typography className="title">Tax:</Typography>
                        <Typography className="value">0đ</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ color: "text.disabled" }}
                    >
                        <Typography className="title">Discount:</Typography>
                        <Typography className="value">-</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={ 2 }>
                    <Stack 
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <Typography>{ totalPrice }đ</Typography>
                    </Stack>
                    <OutlinedInput color="error" placeholder="Voucher" />
                    <Button>Apply voucher</Button>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default VoucherForm
