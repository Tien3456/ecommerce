import React, { useState, useEffect, useRef, useContext } from 'react'
import { 
    Box, Stack, IconButton, Typography, Grid, Skeleton,
    useTheme, useMediaQuery
} from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import BoltIcon from '@mui/icons-material/Bolt'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ProductItem, { Props as IProduct } from '../../components/ProductItem'
import { useStyles } from './styles/FlashDeals'
import { actions } from '../../redux/home/actions'
import { 
    useAppThunkDispatch as useDispatch,
    useAppSelector as useSelector
} from '../../redux/hooks'
import { AppContext } from '../../GlobalContext'
import { useSlideX } from '../../hooks/useSlideX'
import { useFavoriteProducts } from '../../hooks/useFavoriteProducts'

const FlashDeals = () => {
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const isSm = useMediaQuery(theme.breakpoints.only('sm'))
    const isGreaterThanSm = useMediaQuery(theme.breakpoints.up('md'))
    const limit = 10
    const containerRef = useRef<null | HTMLElement>(null)
    const rootRef = useRef<null | HTMLElement>(null)
    const threshold = 60

    const { windowSize } = useContext(AppContext)
    const { flashDeal } = useSelector(state => state.home)

    const [containerWidth, setContainerWidth] = useState<null | number>(null)
    const [visibleItemsQty, setVisibleItemsQty] = useState<number | null>(null)
    const [itemWidth, setItemWidth] = useState<null | number>(null)
    const [spacing, setSpacing] = useState<null | number>(null)

    const {
        isAbleToClick,
        handleBack,
        handleNext,
        handleMouseDown,
        handleMouseMove,
        handleMouseEnd
    } = useSlideX(
        itemWidth,
        spacing,
        threshold,
        limit,
        visibleItemsQty,
        containerRef
    )

    const {
        products,
        favoriteProductIds,
        setFavoriteProductIds
    } = useFavoriteProducts(flashDeal.products)

    useEffect(() => {
        isXs && setVisibleItemsQty(2)
        isSm && setVisibleItemsQty(3)
        isGreaterThanSm && setVisibleItemsQty(4)
    }, [windowSize, isXs, isSm, isGreaterThanSm])

    useEffect(() => {
        rootRef.current &&
            setContainerWidth(rootRef.current.clientWidth)
    }, [windowSize])

    useEffect(() => {
        if(containerWidth !== null && visibleItemsQty) {
            const s = containerWidth / 100 * 3
            const w = (containerWidth - s * (visibleItemsQty - 1)) / visibleItemsQty
            setItemWidth(w)
            setSpacing(s)
        }
    }, [containerWidth, visibleItemsQty])

    useEffect(() => {
        const offset = 0
        dispatch(actions.doGetFlashDeals(offset, limit))
    }, [])

    return (
        <Box 
            className={ classes.root }
            ref={ rootRef }
        >
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 5, width: "100%" }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                >
                    <BoltIcon className={ classes.boltIcon } />
                    <Typography
                        variant="h5"
                        component="h2" 
                        className={ classes.heading }
                        sx={{ fontWeight: "bold" }}
                    >
                        Flash deals
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ color: "text.disabled" }}
                >
                    <Link to="/">View all</Link>
                    <ArrowRightIcon />
                </Stack>
            </Grid>
            <Box 
                ref={ containerRef }
                className={ classes.productsWrapper }
                onPointerDown={ handleMouseDown }
                onPointerUp={ handleMouseEnd }
                onPointerLeave={ handleMouseEnd }
                onPointerMove={ handleMouseMove }
            >
                <Stack 
                    direction="row"
                    alignItems="center"
                    flexWrap="nowrap"
                    className={ classes.rowProducts }
                >
                    {
                        flashDeal.isLoading
                            ? <>
                                {
                                    [0, 1, 2, 3].map((el, i) => (
                                        <Box 
                                            key={ i } 
                                            className={ classes.itemWrapper }
                                        >
                                            <Skeleton
                                                variant="text"
                                                width="100%" height={ 240 }
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="80%" height={ 25 }
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="80%" height={ 25 }
                                            />
                                        </Box>
                                    ))
                                }
                            </>
                            : <>
                            {
                                products.map((item:any) => (
                                    <Box 
                                        key={ item._id }
                                        className={ classes.itemWrapper }
                                    >
                                        <ProductItem
                                            isAbleToLink={ isAbleToClick }
                                            isLiked={
                                                Boolean(favoriteProductIds.find(id => id === item._id))
                                            }
                                            setFavoriteProductIds={ setFavoriteProductIds }
                                            {...item}
                                        />
                                    </Box>
                                ))
                            }
                            </>
                    }
                </Stack>
            </Box>
            <IconButton 
                className="arrow-btn back-arrow-btn"
                onClick={ handleBack }
            >
                <ArrowBackIcon className="arrow-icon" />
            </IconButton>
            <IconButton 
                className="arrow-btn next-arrow-btn"
                onClick={ handleNext }
            >
                <ArrowForwardIcon className="arrow-icon" />
            </IconButton>
        </Box>
    )
}

export default FlashDeals
