import React, { useState, useEffect, useRef, useContext } from 'react'
import { 
    Box, Stack, Typography, Paper, IconButton, Skeleton,
    useTheme, useMediaQuery
} from '@mui/material'
import { Link } from 'react-router-dom'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import NewArrivalItem from './NewArrivalItem'
import { useStyles } from './styles/NewArrivals'
import { 
    useAppThunkDispatch as useDispatch,
    useAppSelector as useSelector
} from '../../redux/hooks'
import { actions } from '../../redux/home/actions'
import { useSlideX } from '../../hooks/useSlideX'
import { AppContext } from '../../GlobalContext'

const NewArrivals = () => {

    const classes = useStyles()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const isSm = useMediaQuery(theme.breakpoints.only('sm'))
    const isGreaterThanSm = useMediaQuery(theme.breakpoints.up('md'))
    const dispatch = useDispatch()
    const offset = 0
    const limit = 20
    const itemsQty = limit / 2
    const threshold = 80

    const containerRef = useRef<HTMLElement | null>(null)

    const { newArrival } = useSelector(state => state.home)
    const { windowSize } = useContext(AppContext)
    
    const [containerWidth, setContainerWidth] = useState<number | null>(null)
    const [itemWidth, setItemWidth] = useState<number | null>(null)
    const [spacing, setSpacing] = useState<number | null>(null)
    const [visibleItemsQty, setVisibleItemsQty] = useState<number | null>(null)

    const {
        handleBack,
        handleNext,
        handleMouseDown,
        handleMouseMove,
        handleMouseEnd
    } = useSlideX(
        itemWidth,
        spacing,
        threshold,
        itemsQty,
        visibleItemsQty,
        containerRef
    )

    useEffect(() => {
        dispatch(actions.doGetNewArrivals(offset, limit))
    }, [])

    useEffect(() => {
        if(containerRef.current) {
            const w = containerRef.current.clientWidth
            setContainerWidth(w)
        }
    }, [windowSize])

    useEffect(() => {
        switch(true) {
            case isXs:
                setVisibleItemsQty(2)
                break
            case isSm:
                setVisibleItemsQty(3)
                break
            case isGreaterThanSm:
                setVisibleItemsQty(4)
                break
            default:
                break
        }
    }, [isXs, isSm, isGreaterThanSm])

    useEffect(() => {
        if(containerWidth !== null && visibleItemsQty !== null) {
            const s = containerWidth / 100 * 3
            const w = (containerWidth - (s * (visibleItemsQty - 1))) / visibleItemsQty
            setSpacing(s)
            setItemWidth(w)
        }
    }, [containerWidth, visibleItemsQty])

    return (
        <Box>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 5 }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    className={ classes.headingWrapper }
                >
                    <NewReleasesIcon className="heading-icon" />
                    <Typography 
                        component="h2"
                        variant="h5"
                    >
                        New arrivals
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    alignItems="center"
                    className={ classes.viewLinkWrapper }
                    sx={{ color: "text.disabled" }}
                >
                    <Link to="/products?newest=true">View all</Link>
                    <ArrowRightIcon />
                </Stack>
            </Stack>
            <Paper>
                <Box className={ classes.container }>
                    <Box 
                        className="row-products-wrapper"
                        ref={ containerRef }
                        onPointerDown={ handleMouseDown }
                        onPointerMove={ handleMouseMove }
                        onPointerUp={ handleMouseEnd }
                    >
                        <Box className="row-products">
                            {
                                newArrival.isLoading
                                    ? <>
                                    {
                                        [0, 1, 2, 3].map((el, i) => (
                                            <Box key={ i }>
                                                <Skeleton 
                                                    variant="text"
                                                    width="100%" sx={{ aspectRatio: "1 / 1" }}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="90%" height={ 25 }
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
                                        newArrival.products.slice(0, limit / 2).map((product: any) => (
                                            <NewArrivalItem
                                                key={ product._id }
                                                _id={ product._id }
                                                name={ product.name }
                                                price={ product.price }
                                                imageSrc={ product.imageSrc }
                                            />
                                        ))
                                    }
                                    </>
                            }
                        </Box>
                        <Box className="row-products">
                            {
                                newArrival.isLoading
                                    ? <>
                                    {
                                        [4, 5, 6, 7].map((el, i) => (
                                            <Box key={ i }>
                                                <Skeleton 
                                                    variant="text"
                                                    width="100%" sx={{ aspectRatio: "1 / 1" }}
                                                />
                                                <Skeleton
                                                    variant="text"
                                                    width="90%" height={ 25 }
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
                                        newArrival.products.slice(-limit / 2).map((product: any) => (
                                            <NewArrivalItem
                                                key={ product._id }
                                                _id={ product._id }
                                                name={ product.name }
                                                price={ product.price }
                                                imageSrc={ product.imageSrc }
                                            />
                                        ))
                                    }
                                    </>
                            }
                        </Box>
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
            </Paper>
        </Box>
    )
}

export default NewArrivals
