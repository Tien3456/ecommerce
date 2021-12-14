import React from 'react'
import { Box, Container, Stack, Typography, Button, Icon, IconButton } from '@mui/material'
import YouTubeIcon from '@mui/icons-material/YouTube'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import { useStyles } from './styles/Footer'

const Footer = () => {

    const classes = useStyles()

    return (
        <footer className={ classes.root }>
            <Container>
                <Box className={ classes.row }>
                    <Stack spacing={ 2 }>
                        <img width={ 120 } height={ 35 } src="/images/logo.svg" alt="logo" />
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
                        </Typography>
                        <Stack 
                            direction="row"
                            alignItems="center"
                            spacing={ 2 }
                        >
                            <Button 
                                className={ classes.downloadBtn }
                                sx={{ textTransform: "unset", py: 1, px: 2 }}
                            >
                                <img 
                                    src="/images/google-play.png" 
                                    alt="google-play-icon" 
                                    height={ 24 }
                                />
                                <Stack 
                                    ml={ 1 }
                                    alignItems="flex-start"
                                >
                                    <Typography component="span">
                                        Get it on
                                    </Typography>
                                    <Typography component="h6">
                                        Google play
                                    </Typography>
                                </Stack>
                            </Button>
                            <Button 
                                className={ classes.downloadBtn }
                                sx={{ textTransform: "unset", py: 1, px: 2 }}
                            >
                                <img 
                                    src="/images/app-store.png" 
                                    alt="app-store-icon" 
                                    height={ 24 }
                                />
                                <Stack 
                                    ml={ 1 }
                                    alignItems="flex-start"
                                >
                                    <Typography component="span">
                                        Download it on the
                                    </Typography>
                                    <Typography component="h6">
                                        App store
                                    </Typography>
                                </Stack>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack spacing={ 1 }>
                        <Typography component="h4">About us</Typography>
                        <Typography component="span">Careers</Typography>
                        <Typography component="span">Our stores</Typography>
                        <Typography component="span">Our cares</Typography>
                        <Typography component="span">Terms & conditions</Typography>
                        <Typography component="span">Privacy Policy</Typography>
                    </Stack>
                    <Stack spacing={ 1 }>
                        <Typography component="h4">Customer Care</Typography>
                        <Typography component="span">Help Center</Typography>
                        <Typography component="span">How to Buy</Typography>
                        <Typography component="span">Track Your Order</Typography>
                        <Typography component="span">Corporate & Bulk Purchasing</Typography>
                        <Typography component="span">Returns & Refunds</Typography>
                    </Stack>
                    <Stack spacing={ 1 }>
                        <Typography component="h4">Contact Us</Typography>
                        <Typography component="span">
                            70 Washington Square South, New York, NY 10012, United States
                        </Typography>
                        <Typography component="span">
                            Email: uilib.help@gmail.com
                        </Typography>
                        <Typography component="span">
                            Phone: +1 1123 456 780
                        </Typography>
                        <Stack 
                            direction="row" 
                            spacing={ 1 }
                        >
                            <IconButton className={ classes.socialBtn }>
                                <Icon className="fab fa-facebook-f social-icon" />
                            </IconButton>
                            <IconButton className={ classes.socialBtn }>
                                <Icon className="fab fa-twitter social-icon" />
                            </IconButton>
                            <IconButton className={ classes.socialBtn }>
                                <YouTubeIcon className="social-icon" />
                            </IconButton>
                            <IconButton className={ classes.socialBtn }>
                                <GoogleIcon className="social-icon" />
                            </IconButton>
                            <IconButton className={ classes.socialBtn }>
                                <InstagramIcon className="social-icon" />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        </footer>
    )
}

export default Footer
