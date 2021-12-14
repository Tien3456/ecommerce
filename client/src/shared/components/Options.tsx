import React from 'react'
import { Paper, Box, Stack, Typography, Button, Icon } from '@mui/material'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import PersonIcon from '@mui/icons-material/Person'
import PaymentIcon from '@mui/icons-material/Payment'
import RoomIcon from '@mui/icons-material/Room'
import { Link, useLocation } from 'react-router-dom'
import { useStyles } from './styles/Options'
import { useAppSelector as useSelector } from '../../redux/hooks'

const Options = () => {

    const classes = useStyles()
    const location = useLocation()

    const { user } = useSelector(state => state.auth)

    return (
        <Paper 
            className={ classes.root } 
            elevation={ 0 }
        >
            <Box mb={ 2 }>
                <Stack spacing={ 2 }>
                    <Box color="text.disabled" pl={ 3 }>
                        <Typography className="heading">Dashboard</Typography>
                    </Box>
                    <Button>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                            >
                                <ShoppingBagOutlinedIcon />
                                Order
                            </Stack>
                        </Stack>
                    </Button>
                    <Button
                        className={
                            location.pathname === '/wishlist'
                                ? "button actived"
                                : "button"
                        }
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Link to="/wishlist">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                >
                                    <FavoriteBorderOutlinedIcon />
                                    Wishlist
                                </Stack>
                            </Link>
                        </Stack>
                    </Button>
                </Stack>
            </Box>
            <Box mt={ 2 }>
                <Stack spacing={ 2 }>
                    <Box color="text.disabled" pl={ 3 }>
                        <Typography className="heading">Account settings</Typography>
                    </Box>
                    <Button
                        className={
                            location.pathname === '/profile'
                                ? "button actived"
                                : "button"
                        }
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ width: "100%" }}
                        >
                            <Link to="/profile">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                >
                                    <PersonIcon />
                                    Profile info
                                </Stack>
                            </Link>
                        </Stack>
                    </Button>
                    <Button
                        className={
                            location.pathname === '/addresses'
                                ? "button actived"
                                : "button"
                        }
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ width: "100%" }}
                        >
                            <Link to="/addresses">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                >
                                    <RoomIcon />
                                    Addresses
                                </Stack>
                            </Link>
                        </Stack>
                    </Button>
                    <Button>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                            >
                                <PaymentIcon />
                                Payment methods
                            </Stack>
                        </Stack>
                    </Button>
                </Stack>
            </Box>
        </Paper>
    )
}

export default Options