import React, { useState, useRef, useEffect } from 'react'
import {
    Box, Stack, 
    styled, useTheme, useMediaQuery
} from '@mui/material'
import { useStyles } from './styles/ImageGroup'
import { useZoomIn } from '../../hooks/useZoomIn'

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => {
        return (
            prop !== "imageSrc" && 
            prop !== "active" && 
            prop !== "backgroundPosition" &&
            prop !== "height" &&
            prop !== "isZoomed"
        )
    }
})((props: any) => ({
    background: props.imageSrc ? `url('${props.imageSrc}')` : "none",
    backgroundPosition: 
        props.backgroundPosition &&
        props.backgroundPosition.x !== null && 
        props.backgroundPosition.y !== null
            ? `${props.backgroundPosition.x}% ${props.backgroundPosition.y}%`
            : "center",
    backgroundSize: props.isZoomed ? "200%" : "cover",
    border: props.active ? `2px solid ${props.theme.customColor.tomato.main}` : "none",
    aspectRatio: props.height ? "unset" : "1 / 1",
}))

const ImageGroup: React.FC<{ imageSrcs: string[] }> = ({ imageSrcs }) => {

    const classes = useStyles()

    const [imageIndex, setImageIndex] = useState<number>(0)

    const {
        isZoomed,
        backgroundPosition,
        handleMouseMove,
        handleMouseLeave
    } = useZoomIn()

    return (
        <Box className={ classes.root }>
            {
                imageSrcs.length > 0 &&
                    <Stack>
                        <Box 
                            sx={{ 
                                mb: 2,
                                overflow: "hidden",
                                borderRadius: "10px"
                            }}
                        >
                            <StyledBox
                                imageSrc={ imageSrcs[imageIndex] }
                                active={ false }
                                isZoomed={ isZoomed }
                                backgroundPosition={ backgroundPosition }
                                className={ classes.bgImage }
                                onMouseMove={ handleMouseMove }
                                onTouchMove={ handleMouseMove }
                                onMouseLeave={ handleMouseLeave }
                                onTouchEnd={ handleMouseLeave }
                            >
                            </StyledBox>
                        </Box>
                        <Box className={ classes.rowImages }>
                            {
                                imageSrcs.map((imageSrc, i) => (
                                    <Box key={ imageSrc }>
                                        <StyledBox 
                                            imageSrc={ imageSrc }
                                            active={ imageIndex === i }
                                            className={ classes.bgImage }
                                            onClick={() => setImageIndex(i)}
                                        >
                                    </StyledBox>
                                    </Box>
                                ))
                            }
                        </Box>
                    </Stack>
            }
        </Box>
    )
}

export default ImageGroup
