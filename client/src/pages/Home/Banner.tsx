import React, { useRef, useEffect, useState } from 'react'
import { 
    Box, Stack, Container, 
    Typography, Button, Radio,
    useTheme, useMediaQuery
} from '@mui/material'
import { useStyles } from './styles/Banner'
import { useSlideX } from '../../hooks/useSlideX'

const Banner = () => {

    const rowBannerRef = useRef<null | HTMLElement>(null)
    const bannersWrapperRef = useRef<null | HTMLElement>(null)
    
    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const isSm = useMediaQuery(theme.breakpoints.only('sm'))
    const bannersQty = 2
    const spacing = 0
    const threshold = 100
    const visibleBannersQty = 1
    const [bannerWidth, setBannerWidth] = useState<null | number>(null)

    const {
        currentIndex,
        handleBack,
        handleNext,
        handleMouseDown,
        handleMouseEnd,
        handleMouseMove,
    } = useSlideX(
        bannerWidth, 
        spacing,
        threshold, 
        bannersQty,
        visibleBannersQty,
        bannersWrapperRef
    )

    const classes = useStyles()

    useEffect(() => {
        rowBannerRef.current &&
            setBannerWidth(rowBannerRef.current.clientWidth)
    }, [isXs, isSm])

    const rowBanner = (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="row-banner"
            spacing={{ xs: 1 }}
        >
            <Box className={ classes.leftBanner }>
                <Typography 
                    component="h1" 
                    className="title"
                >
                    50% Off For Your First Shopping
                </Typography>
                <Typography draggable="false">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convalliss.
                </Typography>
                <Button className="shop-now-btn">
                    Shop now
                </Button>
            </Box>
            <Box className={ classes.rightBanner }>
                <img 
                    src="/images/banner.png" 
                    draggable="false"
                />
            </Box>
        </Stack>
    )

    return (
        <Box className={ classes.root }>
            <Container>
                <Box
                    className={ classes.bannersWrapper }
                    ref={ bannersWrapperRef }
                    onPointerDown={ handleMouseDown }
                    onPointerMove={ handleMouseMove }
                    onPointerUp={ handleMouseEnd }
                    onPointerLeave={ handleMouseEnd }
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className={ classes.stack }
                    >
                        <Box 
                            className="row-banner-wrapper"
                            ref={ rowBannerRef }
                        >
                            { rowBanner }
                        </Box>
                        <Box className="row-banner-wrapper">
                            { rowBanner }
                        </Box>
                    </Stack>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={ 1 }
                    sx={{ pt: 5, pb: 6 }}
                >
                    <Radio
                        checked={ currentIndex === 0 }
                        value="0"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': '0' }}
                        className={ classes.radio }
                        onClick={ handleBack }
                    />
                    <Radio
                        checked={ currentIndex === 1 }
                        value="1"
                        name="radio-buttons"
                        inputProps={{ 'aria-label': '1' }}
                        className={ classes.radio }
                        onClick={ handleNext }
                    />
                </Stack>
            </Container>
        </Box>
    )
}

export default Banner