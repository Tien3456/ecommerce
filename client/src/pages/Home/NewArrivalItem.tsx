import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%",
        '& .image-wrapper': {
            position: "relative",
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: "10px",
            overflow: "hidden",
            '& .overlay': {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "transparent",
                transition: "all 0.3s ease-out",
                webkitTransition: "all 0.3s ease-out",
                mozTransition: "all 0.3s ease-out",
                msTransition: "all 0.3s ease-out",
                '&:hover': {
                    background: "rgba(0, 0, 0, 0.3)"
                }
            },
            '& img': {
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }
        },
        '& .name, & .price': {
            fontWeight: "bold",
            fontSize: "14px",
            maxWidth: `calc(100% - ${theme.spacing(2)})`,
            '&.name': {
                color: theme.customColor.indigo.main
            },
            '&.price': {
                color: theme.customColor.tomato.main
            }
        }
    }
}))

interface Props {
    _id: string,
    name: string,
    price: number,
    imageSrc: string
}

const NewArrivalItem: React.FC<Props> = (props) => {

    const classes = useStyles()

    return (
        <Box className={ classes.root }>
            <Stack 
                alignItems="center"
                spacing={ 1 }
            >
                <Box className="image-wrapper">
                    <img 
                        src={ props.imageSrc } 
                        draggable="false"
                    />
                    <Link to={`/product/${props._id}`}>
                        <Box className="overlay"></Box>
                    </Link>
                </Box>
                <Typography align="center" className="name">
                    { props.name }
                </Typography>
                <Typography className="price">{ `${props.price}đ` }</Typography>
            </Stack>
        </Box>
    )
}

export default NewArrivalItem