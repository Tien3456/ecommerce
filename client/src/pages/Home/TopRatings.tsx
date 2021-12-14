import React, { useEffect } from 'react'
import { 
    Box, Paper, Typography, Stack, Icon, Skeleton,
    useTheme, useMediaQuery
} from '@mui/material'
import TopRatingItem from './TopRatingItem'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Link } from 'react-router-dom'
import { useStyles } from './styles/TopRatings'
import {
    useAppThunkDispatch as useDispatch,
    useAppSelector as useSelector
} from '../../redux/hooks'
import { actions } from '../../redux/home/actions'

const TopRatings = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const theme = useTheme()
    const isGreaterThanXs = useMediaQuery(theme.breakpoints.up('sm'))
    const isSmallerThanLg = useMediaQuery(theme.breakpoints.down('lg'))

    const { topRating } = useSelector(state => state.home)

    useEffect(() => {
        dispatch(actions.doGetTopRatingCategories())
    }, [])

    return (
        <Box className={ classes.root }>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 5 }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                >
                    <Icon className={ `${classes.headingIcon} fas fa-bahai` } />
                    <Typography 
                        component="h2" variant="h5"
                        className={ classes.heading }
                        sx={{ fontWeight: "bold" }}
                    >
                        Top ratings
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
            </Stack>
            <Paper sx={{ p: isGreaterThanXs ? 2 : 1 }}>
                <Box className={ classes.rowProductsWrapper }>
                    <Stack 
                        direction="row"
                        alignItems="center"
                        className={ classes.rowProducts }
                    >
                        {
                            topRating.isLoading
                                ? <>
                                {
                                    [0, 1, 2, 3].map((el, i) => (
                                        <Box 
                                            key={ i }
                                            className={ classes.topRatingItem }
                                        >
                                            <Skeleton
                                                variant="text"
                                                width="100%" sx={{ aspectRatio: "1 / 1" }}
                                            />
                                            <Skeleton
                                                variant="text"
                                                width="100%" height={ 25 }
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
                                    topRating.products.map(product => (
                                        <Box 
                                            key={ product._id }
                                            className={ classes.topRatingItem }
                                        >
                                            <TopRatingItem
                                                category={ product.category }
                                                price={ product.price }
                                                ratingsQty={ product.ratingsQty }
                                                imageSrc={ product.imageSrc }
                                            />
                                        </Box>
                                    ))
                                }
                                </>
                        }
                    </Stack>
                </Box>
            </Paper>
        </Box>
    )
}

export default TopRatings