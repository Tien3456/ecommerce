import React from 'react'
import { Box, ListItem, ListItemText, ListItemAvatar } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

interface Props {
    _id: string,
    imageSrc: string,
    name: string,
    price: number,
    salePercent: number
}

const useStyles = makeStyles((theme: any) => ({
    root: {
        height: "20%",
        '& a': {
            textDecoration: "none",
            color: "unset",
            width: "100%",
            height: "100%"
        },
        '& img': {
            width: "56px",
            height: "56px",
            objectFit: "cover"
        },
        '& .MuiListItemAvatar-root': {
            marginRight: theme.spacing(2)
        },
        '& .MuiListItemText-root': {
            '& span': {
                fontWeight: "bold",
                fontSize: "14px",
                opacity: 0.9,
                maxHeight: "3rem",
                lineHeight: "1.5rem",
                textOverflow: "ellipsis",
                overflow: "hidden"
            },
            '& p': {
                fontWeight: "bold",
                color: theme.customColor.tomato.main
            }
        }
    }
}))

const SearchedProduct: React.FC<Props> = React.memo((props) => {
    
    const classes = useStyles()

    const currentPrice = props.price - props.price * props.salePercent / 100

    return (
        <Box className={ classes.root }>
            <Link to={`/product/${props._id}`}>
                <ListItem>
                    <ListItemAvatar>
                        <img src={ props.imageSrc } />
                    </ListItemAvatar>
                    <ListItemText
                        primary={ props.name }
                        secondary={ `${currentPrice}đ` }
                    />
                </ListItem>
            </Link>
        </Box>
    )
})

export default SearchedProduct