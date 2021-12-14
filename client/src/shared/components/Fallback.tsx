import React from 'react'
import { Box, LinearProgress } from '@mui/material'

const Fallback = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 999
            }}
        >
            <LinearProgress />
        </Box>
    )
}

export default Fallback
