import React, { useState } from 'react'
import { Box, TextareaAutosize, Typography, TextField, Button } from '@mui/material'
import { useStyles } from './styles/VoucherForm'

const VoucherForm = () => {

    const [textareaValue, setTextareaValue] = useState<string>('')

    const classes = useStyles({
        isFilled: textareaValue !== ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.currentTarget.value)
    }

    return (
        <Box>
            <Box mb={ 2 }>
                <Typography className={ classes.label }>
                    Additional comments
                </Typography>
            </Box>
            <Box mb={ 2 }>
                <TextareaAutosize 
                    className={ classes.textarea } 
                    minRows={ 8 }
                    maxRows={ 8 }
                    value={ textareaValue }
                    onChange={ handleChange }
                />
            </Box>
            <Box mb={ 2 }>
                <TextField 
                    variant="outlined" color="error" label="Voucher" 
                    sx={{ width: "100%" }}
                    className={ classes.textField }
                />
            </Box>
            <Button className={ classes.button }>Apply voucher</Button>
        </Box>
    )
}

export default VoucherForm
