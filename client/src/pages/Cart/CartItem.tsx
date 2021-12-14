import React from 'react'
import { Stack, Box, Typography, IconButton, Icon } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useStyles } from './styles/CartItem'

interface Props {
    isOnModal: boolean,
    _id: string,
    name: string,
    currentPrice: string,
    imageSrc: string,
    quantity: number,
    decreaseItem: () => void,
    addItem: () => void,
    removeItem: () => void
}

const CartItem: React.FC<Props> = React.memo((props) => {

    const classes = useStyles({ 
        isOnModal: props.isOnModal
    })

    return (
        <Box className={ classes.root }>
            <Stack
                direction={ props.isOnModal ? "row-reverse" : "row" }
                alignItems="center"
                justifyContent={ props.isOnModal ? "flex-end" : "space-between" }
                spacing={ 2 }
                sx={{ height: "100%" }}
            >
                <Stack 
                    direction="row"
                    alignItems="center"
                    className={ classes.rowCartItem }
                    spacing={ 2 }
                >
                    <img src={ props.imageSrc } />
                    <Stack spacing={ 1 } className="item-info">
                        <Typography 
                            component="h4"
                            className="item-name"
                        >
                            { props.name }
                        </Typography>
                        <Typography 
                            component="span" className="price"
                            sx={{ opacity: 0.6 }}
                        >
                            { props.currentPrice } x { props.quantity }
                        </Typography>
                        <Typography component="span" className="price">
                            { props.currentPrice }
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    direction={ props.isOnModal ? "column" : "row" }
                    alignItems="center"
                    className={ classes.rowIconButtons }
                    spacing={ props.isOnModal ? 0 : 1 }
                >
                    <IconButton 
                        className="icon-button"
                        disabled={ props.quantity <= 1 }
                        onClick={ props.decreaseItem }
                    >
                        <RemoveIcon className="cart-icon" fontSize="small" />
                    </IconButton>
                    <Typography component="span" className="quantity">
                        { props.quantity }
                    </Typography>
                    <IconButton 
                        className="icon-button"
                        onClick={ props.addItem }
                    >
                        <AddIcon className="cart-icon" fontSize="small" />
                    </IconButton>
                </Stack>
            </Stack>
            <IconButton 
                className={ classes.removedButton }
                onClick={ props.removeItem }
            >
                <Icon className="fas fa-times" fontSize="small" />
            </IconButton>
        </Box>
    )
})

export default CartItem