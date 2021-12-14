import React from 'react'
import { Box, Stack, Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgb(255, 255, 255)",
        overflow: "hidden",
        borderRadius: "5px",
        height: "140px",
        '& a': {
            display: "block",
            width: "100%",
            height: "100%",
            textDecoration: "none",
            color: "unset"
        }
    },
    linkWrapper: {
        width: "100%",
        height: "100%",
        padding: theme.spacing(2)
    },
    rowWrapper: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    row: {
        
    },
    overlay: {
        background: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        transition: "all 0.3s ease-out",
        webkitTransition: "all 0.3s ease-out",
        mozTransition: "all 0.3s ease-out",
        msTransition: "all 0.3s ease-out",
        '&:hover': {
            background: "rgba(0, 0, 0, 0.4)"
        }
    },
    img: {
        width: "calc(100% / 3)",
        objectFit: "contain"
    },
    categoryName: {
        position: "absolute",
        top: theme.spacing(1),
        left: theme.spacing(1),
        background: `${theme.customColor.indigo.main} !important`,
        zIndex: 2,
        textTransform: "capitalize",
        '& span': {
            color: "#fff !important",
            fontSize: "10px",
        }
    },
    ordersQty: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        background: "rgba(0, 0, 0, 0.2) !important",
        zIndex: 2,
        '& span': {
            fontSize: "10px"
        }
    }
}))

interface Props {
    category: string,
    buyingsQty: number,
    products: any[]
}

const CategoryItem: React.FC<Props> = (props) => {

    const classes = useStyles()

    return (
        <Box className={ classes.root }>
            <Box className={ classes.linkWrapper }>
                <Link to="/">
                    <Box className={ classes.rowWrapper }>
                        <Stack 
                            direction="row" 
                            className={ classes.row }
                            alignItems="center"
                            sx={{ height: "100%" }}
                        >
                            {
                                props.products.map(product => (
                                    <img 
                                        key={ product._id } 
                                        src={ product.imageSrc } 
                                        draggable="false"
                                        className={ classes.img }
                                    />
                                ))
                            }
                        </Stack>
                        <Box className={ classes.overlay }></Box>
                        <Chip 
                            label={ props.category } 
                            className={ classes.categoryName }
                        />
                        <Chip
                            label={
                                props.buyingsQty / 1000 >= 1
                                    ? `${Math.floor(props.buyingsQty / 1000)}k orders`
                                    : `${props.buyingsQty} orders`
                            }
                            className={ classes.ordersQty }
                            sx={{ color: "text.disabled" }}
                        />
                    </Box>
                </Link>
            </Box>
        </Box>
    )
}

export default CategoryItem
