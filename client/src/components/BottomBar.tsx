import React, { useState } from 'react'
import { 
    Container, Stack, Box, Button, Paper, Badge,
    useTheme, useMediaQuery
} from '@mui/material'
import ViewListIcon from '@mui/icons-material/ViewList'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useStyles } from './styles/BottomBar'
import { Link } from 'react-router-dom'
import { useAppSelector as useSelector } from '../redux/hooks'

const BottomBar = () => {

    const classes = useStyles()
    const theme: any = useTheme()
    const isGreaterThanXs: boolean = useMediaQuery(theme.breakpoints.up('sm'))

    const [showCategories, setShowCategories] = useState<boolean>(false)

    const cartItems = useSelector(state => state.cart)

    const mobileBottomBar = (
        <>
            <Link to="/">
                <Stack 
                    alignItems="center"
                    className={ classes.mobileIconWrapper }
                >
                    <HomeOutlinedIcon className="nav-icon" />
                    <span>Home</span>
                </Stack>
            </Link>
            <Link to="/products">
                <Stack
                    alignItems="center"
                    className={ classes.mobileIconWrapper }
                >
                    <GridViewOutlinedIcon className="nav-icon" />
                    <span>Categories</span>
                </Stack>
            </Link>
            <Link to="/cart">
                <Stack
                    alignItems="center"
                    className={ classes.mobileIconWrapper }
                >
                    <Badge
                        badgeContent={ cartItems.length }
                        sx={{
                            '& .MuiBadge-badge': {
                                background: theme.customColor.tomato.main,
                                color: "#fff"
                            }
                        }}
                    >
                        <ShoppingBagOutlinedIcon className="nav-icon" />
                    </Badge>
                    <span>Cart</span>
                </Stack>
            </Link>
            <Link to="/profile">
                <Stack
                    alignItems="center"
                    className={ classes.mobileIconWrapper }
                >
                    <PersonOutlineOutlinedIcon className="nav-icon" />
                    <span>Account</span>
                </Stack>
            </Link>
        </>
    )

    const tabletBottomBar = (
        <>
            <Box className={ classes.categoriesMenuWrapper }>
                <Button onClick={() => setShowCategories(show => !show)}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                        >
                            <ViewListIcon 
                                className="view-list-icon"
                            />
                            Categories
                        </Stack>
                        <KeyboardArrowRightIcon 
                            className={
                                showCategories
                                    ? "arrow-icon bottom"
                                    : "arrow-icon right"
                            }
                        />
                    </Stack>
                </Button>
                <Paper
                    elevation={3}
                    className={
                        showCategories
                            ? 'categories-list show'
                            : 'categories-list hide'
                    }
                >
                    <Stack>
                        <Link to="/products">
                            All categories
                        </Link>
                        <Link to="/products?categories=converse">Converse</Link>
                        <Link to="/products?categories=vans">Vans</Link>
                        <Link to="/products?categories=palladium">Palladium</Link>
                        <Link to="/products?categories=accessories">Accessories</Link>
                    </Stack>
                </Paper>
            </Box>
            <Stack
                direction="row"
                alignItems="center"
                className={ classes.nav }
            >
                <Link to="/">Home</Link>
                <Link to="/products?categories=converse">Converse</Link>
                <Link to="/products?categories=vans">Vans</Link>
                <Link to="/products?categories=palladium">Palladium</Link>
                <Link to="/products?categories=accessories">Accessories</Link>
            </Stack>
        </>
    )

    return (
        <Box className={ classes.root }>
            <Container sx={{ height: "100%" }}>
                <Stack
                    className={ classes.stack }
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ height: "100%" }}
                >
                    {
                        isGreaterThanXs
                            ? <>{ tabletBottomBar }</>
                            : <>{ mobileBottomBar }</>
                    }
                </Stack>
            </Container>
        </Box>
    )
}

export default BottomBar