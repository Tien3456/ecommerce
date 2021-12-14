import React, { useRef, useEffect } from 'react'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { 
    Box, Grid, Stack, Container,
    Typography
} from '@mui/material'
import SelectMenu from './SelectMenu'
import { Link } from 'react-router-dom'
import { useStyles } from './styles/TopBar'

interface Props {
    setTopBarHeight: (height: number | undefined) => void
}

const TopBar: React.FC<Props> = ({ setTopBarHeight }) => {

    const classes = useStyles()
    const topBarRef = useRef<null | HTMLDivElement>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            const height: undefined | number = topBarRef.current?.scrollHeight
            setTopBarHeight(height)
        }, 1200)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <Box 
            ref={ topBarRef }
            sx={{ width: "100%" }}
            className={ classes.root }
        >
            <Container>
                <Grid 
                    container
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Stack 
                        direction="row"
                        alignItems="center"
                        className="contact-info"
                    >
                        <img 
                            src="/images/logo.svg" 
                            className="logo"
                        />
                        <CallOutlinedIcon 
                            className="top-bar-icon" 
                            fontSize="small"
                        />
                        <Typography 
                            className="top-bar-title" 
                            component="span"
                        >
                            +88012 3456 7894
                        </Typography>
                        <EmailOutlinedIcon 
                            className="top-bar-icon" 
                            fontSize="small"
                        />
                        <Typography 
                            className="top-bar-title" 
                            component="span"
                        >
                            support@ui-lib.com
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        className="select-options"
                    >
                        <Link to="/">
                            Theme FAQ''ss
                        </Link>
                        <Link to="/">
                            Need help?
                        </Link>
                        <Box ml={ 2 }>
                            <SelectMenu
                                id="lang-menu"
                                buttonId="lang-btn"
                                menuItems={[
                                    { content: "EN" },
                                    { content: "BN" },
                                    { content: "HN" }
                                ]}
                            />
                        </Box>
                        <Box>
                            <SelectMenu
                                id="currency-menu"
                                buttonId="currency-btn"
                                menuItems={[
                                    { content: "USD" },
                                    { content: "EUR" },
                                    { content: "BDT" },
                                    { content: "INR" }
                                ]}
                            />
                        </Box>
                    </Stack>
                </Grid>
            </Container>
        </Box>
    )
}

export default TopBar