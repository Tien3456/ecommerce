import React from 'react'
import { Box, Stack, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import BuyingStepper from '../../components/BuyingStepper'
import AddressForm from './AddressForm'
import VoucherForm from './VoucherForm'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgba(25, 118, 210, 0.04)",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(3)
    },
    addressForm: {
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "68%"
        }
    },
    voucherForm: {
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "30%"
        }
    }
}))

const Checkout = () => {

    const classes = useStyles()

    return (
        <Box className={ classes.root }>
            <Container>
                <BuyingStepper />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    sx={{ mb: 3 }}
                >
                    <Box className={ classes.addressForm }>
                        <AddressForm />
                    </Box>
                    <Box className={ classes.voucherForm }>
                        <VoucherForm />
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Checkout
