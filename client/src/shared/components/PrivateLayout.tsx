import React, { useEffect } from 'react'
import { Box, Stack, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Options from './Options'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: "rgba(25, 118, 210, 0.04)",
        position: "relative"
    },
    options: {
        [theme.breakpoints.up('md')]: {
            width: "30%"
        },
        [theme.breakpoints.down('md')]: {
            width: "100%"
        }
    },
    main: {
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - 30% - ${theme.spacing(2)})`
        },
        [theme.breakpoints.down('md')]: {
            width: "100%"
        }
    }
}))

interface Props {
    children: JSX.Element | JSX.Element[]
}

const PrivateLayout: React.FC<Props> = ({ children }) => {

    const classes = useStyles()

    useEffect(() => {
        console.log('private')
    }, [])

    return (
        <Box py={ 5 } className={ classes.root }>
            <Container>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Box className={ classes.options }>
                        <Options />
                    </Box>
                    <Box className={ classes.main }>
                        { children }
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default PrivateLayout