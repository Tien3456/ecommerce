import React from 'react'
import { 
    Paper, Box, Stack, Typography,
    useTheme, useMediaQuery
} from '@mui/material'
import FilterVintageRoundedIcon from '@mui/icons-material/FilterVintageRounded'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%"
    },
    rowProducts: {
        '& .product': {
            width: "50%",
            '& .image-wrapper': {
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                width: "100%",
                aspectRatio: "16 / 9",
                '& img': {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                },
                '& .overlay': {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: "transparent",
                    transition: "all 0.3s ease-out",
                    webkitTransition: "all 0.3s ease-out",
                    mozTransition: "all 0.3s ease-out",
                    msTransition: "all 0.3s ease-out",
                    oTransition: "all 0.3s ease-out",
                    '&:hover': {
                        background: "rgba(0, 0, 0, 0.3)"
                    }
                }
            },
            '& p': {
                fontSize: "14px",
                fontWeight: "bold",
                color: theme.customColor.indigo.main,
                marginTop: theme.spacing(1)
            }
        }
    }
}))

const FeatureBranch = () => {

    const classes = useStyles()
    const theme: any = useTheme()

    return (
        <Box className={ classes.root }>
            <Stack 
                direction="row"
                alignItems="center"
                sx={{ py: 5 }}
            >
                <FilterVintageRoundedIcon
                    sx={{ color: "rgb(255, 145, 1)" }}
                />
                <Typography 
                    component="h2" variant="h5" 
                    sx={{
                        color: theme.customColor.indigo.main,
                        fontWeight: "bold",
                        ml: theme.spacing(1)
                    }}
                >
                    Feature branch
                </Typography>
            </Stack>
            <Paper>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={ 2 }
                    sx={{ p: 2 }}
                    className={ classes.rowProducts }
                >
                    <Box className="product">
                        <Box className="image-wrapper">
                            <img src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Flondon-britches.png&w=1920&q=75" />
                            <Box className="overlay"></Box>
                        </Box>
                        <Typography>London britches</Typography>
                    </Box>
                    <Box className="product">
                        <Box className="image-wrapper">
                            <img src="https://bazar-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fjim%20and%20jiko.png&w=1920&q=75" />
                            <Box className="overlay"></Box>
                        </Box>
                        <Typography>Jim & jago</Typography>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    )
}

export default FeatureBranch