import React, { useState, useEffect, useContext, useRef } from 'react'
import { 
    Grid, Stack, Box, Typography, IconButton, Skeleton,
    useTheme, useMediaQuery
} from '@mui/material'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CategoryItem from './CategoryItem'
import { Link } from 'react-router-dom'
import { useStyles } from './styles/TopCategories'
import {
    useAppThunkDispatch as useDispatch,
    useAppSelector as useSelector
} from '../../redux/hooks'
import { actions } from '../../redux/home/actions'
import { AppContext } from '../../GlobalContext'
import { useSlideX } from '../../hooks/useSlideX'

const TopCategories = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const isSm = useMediaQuery(theme.breakpoints.only('sm'))
    const isGreaterThanXm = useMediaQuery(theme.breakpoints.up('md'))
    const containerRef = useRef<null | HTMLElement>(null)
    const threshold = 80

    const { topCategory } = useSelector(state => state.home)
    const { categories } = topCategory
    const { windowSize } = useContext(AppContext)

    const [itemsQty, setItemsQty] = useState<number | null>(null)
    const [visibleItemsQty, setVisibleItemsQty] = useState<number | null>(null)
    const [itemWidth, setItemWidth] = useState<number | null>(null)
    const [spacing, setSpacing] = useState<number | null>(null)
    const [containerWidth, setContainerWidth] = useState<number | null>(null)

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
        dispatch(actions.doGetTopCategory())
    }, [])

    useEffect(() => {
        containerRef.current &&
            setContainerWidth(containerRef.current.clientWidth)
    }, [windowSize])

    useEffect(() => {
        if(categories.length > 0) {
            setItemsQty(categories.length)
        }
    }, [categories])

    useEffect(() => {
        isXs && setVisibleItemsQty(1)
        isSm && setVisibleItemsQty(2)
        isGreaterThanXm && setVisibleItemsQty(3)
    }, [isXs, isSm, isGreaterThanXm])

    useEffect(() => {
        if(containerWidth !== null && visibleItemsQty !== null) {
            const s = containerWidth / 100 * 3
            const w = (containerWidth - s * (visibleItemsQty - 1)) / visibleItemsQty
            setSpacing(s)
            setItemWidth(w)
        }
    }, [containerWidth, visibleItemsQty])

    return (
        <Box className={ classes.root }>
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
                    <GridViewRoundedIcon className={ classes.gridViewIcon } />
                    <Typography
                        variant="h5"
                        component="h2" 
                        className={ classes.heading }
                        sx={{ fontWeight: "bold" }}
                    >
                        Top categories
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
            <Box className={ classes.container }>
                <Box 
                    className={ classes.rowWrapper }
                    ref={ containerRef }
                    onPointerDown={ handleMouseDown }
                    onPointerMove={ handleMouseMove }
                    onPointerUp={ handleMouseEnd }
                    onPointerLeave={ handleMouseEnd }
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        {
                            topCategory.isLoading
                                ? <>
                                    {
                                        [0, 1, 2].map((el, i) => (
                                            <Box 
                                                className={ classes.categoryItem }
                                                key={ i }
                                            >
                                                <Skeleton
                                                    variant="text"
                                                    width="100%" height={ 160 }
                                                />
                                            </Box>
                                        ))
                                    }
                                </>
                                : <>
                                    {
                                    topCategory.categories.map((item, index) => (
                                            <Box 
                                                className={ classes.categoryItem }
                                                key={ `${item.category}${index}` }
                                            >
                                                <CategoryItem
                                                    category={ item.category }
                                                    buyingsQty={ item.buyingsQty }
                                                    products={ item.products }
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
        </Box>
    )
}

export default TopCategories