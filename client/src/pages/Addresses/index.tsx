import React, { useState, useEffect, useCallback } from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Address, { Props as IAddress } from './Address'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { useAsync } from '../../hooks/useAsync'
import { api } from '../../api/index'
import { useAppSelector as useSelector } from '../../redux/hooks'

const useStyles = makeStyles((theme: any) => ({
    root: {
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(2)
        }
    },
    headingWrapper: {
        '& svg': {
            color: theme.customColor.tomato.main
        },
        '& h2.MuiTypography-root': {
            fontWeight: "bold",
            opacity: 0.9
        },
        '& button.MuiButton-root': {
            background: theme.customColor.tomato.light,
            color: theme.customColor.tomato.main,
            textTransform: "capitalize",
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            '&:hover': {
                opacity: 0.9
            }
        }
    }
}))

const Addresses = () => {

    const classes = useStyles()

    const { user } = useSelector(state => state.auth)

    const getAddresses = useAsync<{ addresses: IAddress[] }>(() => {
        return api.get(`/user/addresses`)
    })

    const [addresses, setAddresses] = useState<IAddress[]>([])

    useEffect(() => {
        if(getAddresses.value) {
            setAddresses(getAddresses.value.addresses)
        }
    }, [getAddresses.value])

    const addNewAddress = () => {
        setAddresses((prevAddresses) => {
            const newAddress = {
                name: '',
                addressLine: '',
                phone: '',
                isAbleToEdit: true
            }
            prevAddresses.unshift(newAddress)
            return [...prevAddresses]
        })
    }

    return (
        <Box className={ classes.root }>
            <Stack 
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                className={ classes.headingWrapper }
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={ 1 }
                >
                    <LocationOnIcon />
                    <Typography component="h2" variant="h5">My address</Typography>
                </Stack>
                <Button onClick={ addNewAddress }>
                    Add new address
                </Button>
            </Stack>
            <Stack
                sx={{ mt: 2 }}
                spacing={ 2 }
            >
                {
                    addresses.length > 0 &&
                    addresses.map((address: IAddress) => (
                        <Address
                            key={ address._id }
                            _id={ address._id }
                            name={ address.name }
                            addressLine={ address.addressLine }
                            phone={ address.phone }
                            createdAt={ address.createdAt }
                            isAbleToEdit={ Boolean(address.isAbleToEdit) }
                            setAddresses={ setAddresses }
                        />
                    ))
                }
            </Stack>
        </Box>
    )
}

export default Addresses