import React from 'react'
import { 
    Paper, Stack, Typography, Box,
    FormGroup, TextField
} from '@mui/material'
import { useStyles } from './styles/AddressForm'

const AddressForm = () => {

    const classes = useStyles()

    return (
        <Paper 
            elevation={ 0 }
            sx={{ p: 2 }}
            className={ classes.root }
        >
            <Box mb={ 2 }>
                <Typography 
                    component="h4"
                    className="heading"
                >
                    Shipping address
                </Typography>
            </Box>
            <FormGroup className={ classes.formGroup }>
                <Box className={ classes.rowFormGroup }>
                    <TextField
                        variant="outlined"
                        label="Full name"
                        color="error"
                    />
                    <TextField
                        variant="outlined"
                        label="Phone number"
                        color="error"
                    />
                    <TextField
                        variant="outlined"
                        label="Zip code"
                        color="error"
                    />
                    <TextField
                        variant="outlined"
                        label="Address1"
                        color="error"
                    />
                    <TextField
                        variant="outlined"
                        label="Address2"
                        color="error"
                    />
                    <TextField
                        variant="outlined"
                        label="Email address"
                        color="error"
                    />
                    <TextField
                        variant="outlined"
                        label="Company"
                        color="error"
                    />
                    <TextField
                        variant="outlined"
                        label="Country"
                        color="error"
                    />
                </Box>
            </FormGroup>
        </Paper>
    )
}

export default AddressForm
