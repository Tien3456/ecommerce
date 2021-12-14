import React, { useState, useEffect } from 'react'
import { 
    Box, FormControl, InputLabel, Select, Typography, Button,
    MenuItem, SelectChangeEvent, OutlinedInput, TextField
} from '@mui/material'
import { useStyles } from './styles/AddressForm'
import { api } from '../../api/index'
import { useAsync } from '../../hooks/useAsync'
import { Link } from 'react-router-dom'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    }
  }
}

const AddressForm: React.FC<{ cartItemsQty: number }> = ({ cartItemsQty }) => {
    
    const classes = useStyles()

    const [selectedCountry, setSelectCountry] = useState('')

    const fetchCountries = async (): Promise<{ name: string, code: string }[]> => {
        return api.get('/countries')
            .then((res: any) => res.countries)
    }

    const { isLoading, value: countries } = useAsync(fetchCountries)

    const handleChange = (e: SelectChangeEvent<string>) => {
        setSelectCountry(e.target.value as string)
    }

    return (
        <Box>
            <Box mb={ 3 }>
                <Typography 
                    sx={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        opacity: 0.9
                    }}
                >
                    Shipping Estimates
                </Typography>
            </Box>
            <FormControl 
                sx={{ width: "100%" }}
                className={ classes.formControl }
            >
                <Box mb={ 3 } sx={{ position: "relative" }}>
                    <InputLabel id="country" color="error">Country</InputLabel>
                    <Select
                        labelId="country"
                        value={ selectedCountry }
                        input={<OutlinedInput color="error" label="Country" />}
                        MenuProps={ MenuProps }
                        onChange={ handleChange }
                    >
                        {
                            countries !== null &&
                            countries?.map(c => c.name).map(country => (
                                <MenuItem key={ country } value={ country }>{ country }</MenuItem>
                            ))
                        }
                    </Select>
                </Box>
                <Box mb={ 2 }>
                    <TextField
                        variant="outlined"
                        label="Zip Code"
                        sx={{ width: "100%" }}
                        color="error"
                    />
                </Box>
                <Box mb={ 2 }>
                    <Button>Calculate shipping</Button>
                </Box>
                <Box>
                    <Button 
                        className="btn-link"
                        disabled={ cartItemsQty === 0 }
                    >
                        <Link to="/checkout">Checkout</Link>
                    </Button>
                </Box>
            </FormControl>
        </Box>
    )
}

export default AddressForm
