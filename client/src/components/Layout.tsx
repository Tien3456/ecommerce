import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Modal from '../modal/index'
import { Box, useTheme, useMediaQuery } from '@mui/material'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {

    const theme = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    return (
        <>
            <Header />
            <Box
                className="main"
                sx={{
                    position: isXs ? "fixed": "relative",
                    height: isXs ? "78%" : "auto",
                    top: isXs ? "12%" : "auto",
                    left: isXs ? 0 : "auto",
                    width: isXs ? "100%" : "auto",
                    zIndex: isXs ? 98 : "auto",
                    overflow: isXs ? "hidden auto" : "unset"
                }}
            >
                { children }
                <Footer />
            </Box>
            <Modal />
        </>
    )
}

export default Layout
