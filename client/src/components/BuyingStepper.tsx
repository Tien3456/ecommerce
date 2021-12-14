import React, { useState } from 'react'
import { Stack, Button } from '@mui/material'
import { useStyles } from './styles/BuyingStepper'
import { useLocation, Link } from 'react-router-dom'

const BuyingStepper = () => {

    const classes = useStyles()
    const location = useLocation()

    return (
        <Stack
            direction="row"
            alignItems="center"
            className={ classes.root }
            sx={{ px: 5, py: 4 }}
        >
            <Button
                className={
                    location.pathname === '/cart' ||
                    location.pathname === '/checkout' ||
                    location.pathname === '/payment'
                        ? "btn-link active"
                        : "btn-link"
                }
            >
                <Link to="/cart">Cart</Link>
            </Button>
            <span 
                className={
                    location.pathname === '/checkout' ||
                    location.pathname === '/payment'
                        ? "divider active"
                        : "divider"
                }
            >
            </span>
            <Button
                className={
                    location.pathname === '/checkout' ||
                    location.pathname === '/payment'
                        ? "btn-link active"
                        : "btn-link"
                }
            >
                <Link to="/checkout">Details</Link>
            </Button>
            <span
                className={
                    location.pathname === '/payment'
                        ? "divider active"
                        : "divider"
                }
            >
            </span>
            <Button
                className={
                    location.pathname === '/payment'
                        ? "btn-link active"
                        : "btn-link"
                }
            >
                <Link to="/payment">Payment</Link>
            </Button>
            <span className="divider"></span>
            <Button>
                Review
            </Button>
        </Stack>
    )
}

export default BuyingStepper
