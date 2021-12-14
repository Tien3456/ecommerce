import React from 'react'
import { Box, Typography, Stack, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgb(255, 255, 255)",
        boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        borderRadius: "8px",
        '&:hover': {
            boxShadow: "rgb(3 0 71 / 9%) 0px 8px 45px"
        }
    },
    iconButton: {
        width: "64px",
        height: "64px",
        background: "rgb(243, 245, 249) !important",
        '&:hover': {
            opacity: 0.8
        }
    },
    title: {
        color: theme.customColor.indigo.main,
        maxWidth: "80%"
    },
    description: {
        color: theme.customColor.indigo.main,
        maxWidth: "80%",
        opacity: 0.9
    }
}))

interface Props {
    icon: JSX.Element | JSX.Element[],
    title: string,
    description: string
}

const AboutItem: React.FC<Props> = (props) => {

    const classes = useStyles()

    return (
        <Box 
            className={ classes.root }
            sx={{ py: 6, px: 2 }}
        >
            <Stack 
                alignItems="center"
                spacing={ 2 }
            >
                <IconButton className={ classes.iconButton }>
                    { props.icon }
                </IconButton>
                <Typography 
                    component="h4"
                    className={ classes.title }
                    sx={{ fontWeight: "bold" }}
                >
                    { props.title }
                </Typography>
                <Typography
                    align="center"
                    className={ classes.description }
                    sx={{
                        fontSize: "14px"
                    }}
                >
                    { props.description }
                </Typography>
            </Stack>
        </Box>
    )
}

export default AboutItem
