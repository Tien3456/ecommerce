import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { 
    Stack, Box, Typography, IconButton, InputUnstyled,
    useTheme, useMediaQuery
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import { useStyles } from './styles/Address'
import { api } from '../../api/index'
import { useAsync } from '../../hooks/useAsync'

interface IAddress {
    _id?: string,
    name: string,
    addressLine: string,
    phone: string,
    createdAt?: string
}

export interface Props extends IAddress {
    isAbleToEdit: boolean,
    setAddresses?: Dispatch<SetStateAction<any>>
}

const Address: React.FC<Props> = (props) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const classes = useStyles()

    const [name, setName] = useState<string>(props.name)
    const [addressLine, setAddressLine] = useState<string>(props.addressLine)
    const [phone, setPhone] = useState<string>(props.phone)
    const [isAbleToEdit, setAbleToEdit] = useState<boolean>(props.isAbleToEdit)
    
    const updateAddress = useAsync<{
        isUpdated: boolean,
        newAddress: IAddress
    }>(() => {
        let type = 'add'
        let address: any = {
            name,
            addressLine,
            phone
        }
        if(props._id) {
            type = 'update'
            address._id = props._id
        }
        return api.post('/user/addresses/update', {
            type,
            newAddress: address
        })
    }, false) // immediate = false

    const deleteAddress = useAsync<{ isUpdated: boolean }>(() => {
        if(props._id) {
            return api.get(`/user/addresses/delete/${props._id}`)
        }
    }, false)

    useEffect(() => {
        if(
            updateAddress.value &&
            props.setAddresses
        ) {
            const { isUpdated, newAddress } = updateAddress.value
            if(!isUpdated) {
                props.setAddresses((prevAddresses: IAddress[]) => {
                    prevAddresses.splice(0, 1)
                    return [...prevAddresses]
                })
                return
            }
            !props._id
                ? props.setAddresses((prevAddresses: IAddress[]) => {
                    if(prevAddresses.length > 0) {
                        prevAddresses[0] = newAddress
                    }
                    return [...prevAddresses]
                })
                : props.setAddresses((prevAddresses: IAddress[]) => {
                    const currentAddress = prevAddresses.find(address => address._id === props._id)
                    if(currentAddress) {
                        const index = prevAddresses.indexOf(currentAddress)
                        prevAddresses[index] = newAddress
                    }
                    return [...prevAddresses]
                })
            setAbleToEdit(false)
        }
    }, [updateAddress.value])

    useEffect(() => {
        if(deleteAddress.value && props._id && props.setAddresses) {
            const { isUpdated } = deleteAddress.value
            if(isUpdated) {
                props.setAddresses((prevAddresses: IAddress[]) => {
                    const currentAddress = prevAddresses.find(address => address._id === props._id)
                    if(currentAddress) {
                        const index = prevAddresses.indexOf(currentAddress)
                        prevAddresses.splice(index, 1)
                    }
                    return [...prevAddresses]
                })
            }
        }
    }, [deleteAddress.value])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleChangeAddressLine = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressLine(e.target.value)
    }
    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    const cancleEditing = () => {
        if(!props._id && props.setAddresses) {
            props.setAddresses((prevAddresses: IAddress[]) => {
                prevAddresses.splice(0, 1)
                return [...prevAddresses]
            })
            return
        }
        setAbleToEdit(false)
        setName(props.name)
        setAddressLine(props.addressLine)
        setPhone(props.phone)
    }

    return (
        <Stack 
            direction={ isXs ? "column" : "row" }
            alignItems={ isXs ? "flex-start" : "center" }
            justifyContent="space-between"
            className={ classes.root }
        >
            <InputUnstyled 
                autoFocus={ isAbleToEdit }
                value={ name } 
                disabled={ isAbleToEdit === false } 
                onChange={ handleChangeName }
            />
            <InputUnstyled
                value={ addressLine } 
                disabled={ isAbleToEdit === false } 
                onChange={ handleChangeAddressLine }
            />
            <InputUnstyled
                value={ phone } 
                disabled={ isAbleToEdit === false } 
                onChange={ handleChangePhone }
            />
            <Box>
                {
                    isAbleToEdit
                        ? <>
                            <IconButton 
                                onClick={() => updateAddress.execute()}
                                disabled={ 
                                    !name.trim() || 
                                    !addressLine.trim() || 
                                    phone.trim().length < 9 ||
                                    updateAddress.isLoading
                                }
                            >
                                <DoneIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                                onClick={ cancleEditing }
                                disabled={ updateAddress.isLoading }
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                        : <>
                            <IconButton onClick={() => setAbleToEdit(true)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                onClick={() => deleteAddress.execute()}
                                disabled={ deleteAddress.isLoading }
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </>
                }
            </Box>
        </Stack>
    )
}

export default Address
