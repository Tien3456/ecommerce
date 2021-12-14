import React, { useState, useEffect, useRef, EffectCallback } from 'react'
import { 
    Box, Stack, Container, Select, 
    MenuItem, Button, IconButton, Badge, SelectChangeEvent,
    List, CircularProgress
} from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SearchedProduct from './SearchedProduct'
import { useStyles } from './styles/MiddleBar'
import { 
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
    useAppThunkDispatch
} from '../redux/hooks'
import { actions } from '../redux/header/actions'
import { actions as modalActions } from '../redux/modal/actions'
import { useUpdateEffect } from '../hooks/useUpdateEffect'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'
import { Link, useLocation } from 'react-router-dom'

interface Props {
    topBarHeight: undefined | number
}

const MiddleBar: React.FC<Props> = ({ topBarHeight }) => {

    const dispatch = useDispatch()
    const thunkDispatch = useAppThunkDispatch()
    const fixedMiddleBar = useRef<boolean>(false)
    const middleBarRef = useRef<null | HTMLDivElement>(null)
    const searchActions = useRef<null | ReturnType<typeof setTimeout>>(null)
    const showList = useRef<null | ReturnType<typeof setTimeout>>(null)
    const prevLatestProductRef = useRef<null | HTMLElement>(null)
    const limit = 20

    const location = useLocation()

    const [textFieldValue, setTextFieldValue] = useState<string>('')
    const [selectedCategory, setSelectCategory] = useState<string>('')
    const [openSelectMenu, setOpenSelectMenu] = useState<boolean>(false)
    const [products, setProducts] = useState<any[]>([])  // searched products

    const { 
        isFixedMiddleBar,
        searchedProducts
    } = useSelector(state => state.header)
    const cartItems = useSelector(state => state.cart)
    const { authenticated, user } = useSelector(state => state.auth)

    const prevLatestProductIndex = (Math.floor(searchedProducts.list.length / limit) - 1) * limit

    const classes = useStyles({ 
        hasFilledText: Boolean(textFieldValue) 
    })

    const loadMoreProducts = () => {
        const offset = searchedProducts.list.length
        if(offset !== 0) {
            thunkDispatch(actions.doSearchProducts(
                textFieldValue, 
                selectedCategory,
                offset,
                limit
            ))
        }
    }

    const { handleScroll } = useInfiniteScroll(
        loadMoreProducts, 
        searchedProducts.list.length,
        prevLatestProductRef
    )

    useEffect((): ReturnType<EffectCallback> => {
        return (): void => {
            if(searchActions.current) {
                clearTimeout(searchActions.current)
            }
            if(showList.current) {
                clearTimeout(showList.current)
            }
        }
    }, [])

    useEffect(() => {
        const fixMiddleBar = () => {
            const height: undefined | number = middleBarRef.current?.scrollHeight
            const scrollY: number = window.scrollY
            switch(fixedMiddleBar.current) {
                case false:
                    if(height && topBarHeight && scrollY > height + topBarHeight) {
                        dispatch(actions.doFixMiddleBar())
                    }
                    fixedMiddleBar.current = true
                    break
                default:
                    if(height && topBarHeight && scrollY < height + topBarHeight) {
                        dispatch(actions.doUnfixMiddleBar())
                    }
                    fixedMiddleBar.current = false
                    break
            }
        }
        fixMiddleBar()
        window.addEventListener('scroll', fixMiddleBar)
        return () => window.removeEventListener('scroll', fixMiddleBar)
    }, [topBarHeight])

    useUpdateEffect(() => {
        if(searchActions.current) {
            clearTimeout(searchActions.current)
        }
        let offset = 0
        searchActions.current = setTimeout(() => {
            thunkDispatch(actions.doSearchProducts(
                textFieldValue, 
                selectedCategory, 
                offset, 
                limit
            ))
        }, 1000)
    }, [textFieldValue, selectedCategory])

    useEffect(() => {
        if(searchedProducts.list.length > 0) {
            setProducts([...searchedProducts.list])
            return
        }
        if(searchedProducts.list.length === 0 && products.length > 0) {
            showList.current = setTimeout(() => {
                setProducts([])
            }, 500)
        }
    }, [searchedProducts.list])

    const handleSelect = (e: SelectChangeEvent) => {
        setSelectCategory(e.target.value)
        setOpenSelectMenu(false)
    }

    return (
        <Box
            ref={ middleBarRef }
            className={
                isFixedMiddleBar
                    ? `${classes.root} fixed`
                    : classes.root
            }
        >
            <Container>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    className={ classes.stack }
                >
                    <img 
                        src="/images/logo.svg" height={ 28 } 
                        className={ classes.logo }
                    />
                    <Box className={ classes.formWrapper }>
                        <form>
                            <Box 
                                sx={{ 
                                    width: "100%",
                                    position: "relative",
                                    borderRadius: "20px"
                                }}
                            >
                                <Box className={ classes.selectWrapper }>
                                    <Select
                                        value={ selectedCategory }
                                        displayEmpty
                                        sx={{ width: "100%" }}
                                        renderValue={(selected) => (
                                            <Button>
                                                { selectedCategory || "All categories" }
                                            </Button>
                                        )}
                                        onChange={ handleSelect }
                                    >
                                        <MenuItem value="">
                                            All categories
                                        </MenuItem>
                                        <MenuItem value="converse">Converse</MenuItem>
                                        <MenuItem value="vans">Vans</MenuItem>
                                        <MenuItem value="palladium">Palladium</MenuItem>
                                        <MenuItem value="accessories">Accessories</MenuItem>
                                        <MenuItem value="apparel">Apparel</MenuItem>
                                    </Select>
                                </Box>
                                <input 
                                    type="text" placeholder="Seaching for..."
                                    className={ classes.textField }
                                    onChange={(e) => {
                                        setTextFieldValue(e.currentTarget.value)
                                    }}
                                    value={ textFieldValue }
                                />
                                {
                                    searchedProducts.isSearching
                                        ? <Box 
                                            className="loading-wrapper"
                                            color="text.disabled"
                                        >
                                            <CircularProgress color="inherit" size={ 20 } />
                                        </Box>
                                        : <SearchIcon fontSize="small" className="search-icon" />
                                }
                                <List 
                                    className={ 
                                        searchedProducts.list.length > 0
                                            ? `${classes.searchedProducts} show-list`
                                            : classes.searchedProducts
                                    }
                                    onScroll={ handleScroll }
                                >
                                    {
                                        products.map((product: any, i: number) => (
                                            i === prevLatestProductIndex
                                                ? <SearchedProduct
                                                    ref={ prevLatestProductRef }
                                                    key={ product._id }
                                                    {...product}
                                                />
                                                : <SearchedProduct
                                                    key={ product._id }
                                                    {...product}
                                                />
                                        ))
                                    }
                                    {
                                        searchedProducts.isLoadingMore &&
                                            <Stack
                                                alignItems="center"
                                                justifyContent="center"
                                                sx={{ py: 2 }}
                                            >
                                                <CircularProgress size={ 25 } color="error" />
                                            </Stack>
                                    }
                                </List>
                            </Box>
                        </form>
                    </Box>
                    <Box className={ classes.iconButtonsWrapper }>
                        <Link 
                            to={{
                                pathname: authenticated 
                                    ? '/profile'
                                    : '/signin',
                                state: {
                                    from: '/profile'
                                }
                            }}
                        >
                            <IconButton 
                                className={ classes.iconButton }
                                sx={{ mr: 2 }}
                            >
                                {
                                    authenticated && user !== null && user.avatarSrc
                                        ? <img src={ user.avatarSrc } />
                                        : <PersonOutlineIcon />
                                }
                            </IconButton>
                        </Link>
                        <Badge
                            className="badge"
                            badgeContent={ cartItems.length }
                        >
                            <IconButton 
                                className={ classes.iconButton }
                                onClick={() => dispatch(modalActions.doShowModal('cart'))}
                            >
                                <ShoppingBagOutlinedIcon />
                            </IconButton>
                        </Badge>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default MiddleBar
