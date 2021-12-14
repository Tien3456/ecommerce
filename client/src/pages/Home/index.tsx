import React, { EffectCallback, useEffect } from 'react'
import FlashDeals from './FlashDeals'
import TopCategories from './TopCategories'
import TopRatings from './TopRatings'
import FeatureBranch from './FeatureBranch'
import NewArrivals from './NewArrivals'
import Banner from './Banner'
import AboutItem from './AboutItem'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined'
import { Box, Container, Stack, Icon } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { actions } from '../../redux/home/actions'
import { useAppDispatch as useDispatch } from '../../redux/hooks'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgba(25, 118, 210, 0.04)",
        paddingBottom: theme.spacing(6)
    },
    rowCategories: {
        display: "grid",
        [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: "repeat(2, 49%)",
            gap: "calc(100% - (49% * 2))"
        },
        [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: "100%"
        }
    },
    aboutItemWrapper: {
        [theme.breakpoints.up('lg')]: {
            width: "calc((100% - 3% * 3) / 4)"
        },
        [theme.breakpoints.down('lg')]: {
            width: "calc((100% - 3% * 1) / 2)",
            marginBottom: theme.spacing(2)
        },
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        }
    }
}))

const Home = () => {

    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect((): ReturnType<EffectCallback> => {
        return (): void => {
            dispatch(actions.doResetHomeState())
        }
    }, [])

    return (
        <Box className={ classes.root }>
            <Banner />
            <Container>
                <FlashDeals />
                <TopCategories />
                <Box className={ classes.rowCategories }>
                    <TopRatings />
                    <FeatureBranch />
                </Box>
                <NewArrivals />
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    sx={{ py: 5, pb: 3 }}
                >
                    <Box className={ classes.aboutItemWrapper }>
                        <AboutItem
                            icon={<DeliveryDiningOutlinedIcon />}
                            title="Worldwide Delivery"
                            description="We offer competitive prices on our 100 million plus product any range."
                        />
                    </Box>
                    <Box className={ classes.aboutItemWrapper }>
                        <AboutItem
                            icon={<Icon className="far fa-credit-card" fontSize="small" />}
                            title="Safe Payment"
                            description="We offer competitive prices on our 100 million plus product any range."
                        />
                    </Box>
                    <Box className={ classes.aboutItemWrapper }>
                        <AboutItem
                            icon={<GppGoodOutlinedIcon />}
                            title="Shop With Confidence"
                            description="We offer competitive prices on our 100 million plus product any range."
                        />
                    </Box>
                    <Box className={ classes.aboutItemWrapper }>
                        <AboutItem
                            icon={<HeadphonesOutlinedIcon />}
                            title="24/7 Support"
                            description="We offer competitive prices on our 100 million plus product any range."
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default Home
