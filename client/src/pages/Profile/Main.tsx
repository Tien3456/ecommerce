import React from 'react'
import { 
    Box, Stack, Typography, Button, Avatar,
    useTheme
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useStyles } from './styles'
import { Link } from 'react-router-dom'
import { useAppSelector as useSelector } from '../../redux/hooks'

const Main = () => {

    const theme: any = useTheme()
    const classes = useStyles()

    const { user } = useSelector(state => state.auth)

    return (
        <Box className={ classes.root }>
            <Stack spacing={ 2 }>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    className={ classes.headingWrapper }
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <PersonIcon />
                        <Typography component="h2" variant="h5">My Profile</Typography>
                    </Stack>
                    <Button>
                        <Link to="/profile/edit">Edit profile</Link>
                    </Button>
                </Stack>
                <Box className={ classes.gridContainer }>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        className={ classes.card }
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={ 2 }
                        >
                            <Avatar className="avatar">
                                { user.username.slice(0, 1).toUpperCase() }
                            </Avatar>
                            <Stack spacing={ 1 }>
                                <Typography className="username">
                                    { user.username }
                                </Typography>
                                <Box 
                                    color="text.disabled"
                                    sx={{
                                        '& *': {
                                            fontSize: "14px"
                                        }
                                    }}
                                >
                                    <Typography>
                                        Balance:&nbsp;
                                        <Typography component="span" className="balance">
                                            $0.00
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Box color="text.disabled">
                            <Typography className="user-type">Silver user</Typography>
                        </Box>
                    </Stack>
                    <Stack 
                        className={ classes.quantityWrapper }
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography>16</Typography>
                        <Box color="text.disabled">
                            <Typography>All orders</Typography>
                        </Box>
                    </Stack>
                    <Stack 
                        className={ classes.quantityWrapper }
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography>16</Typography>
                        <Box color="text.disabled">
                            <Typography>All orders</Typography>
                        </Box>
                    </Stack>
                    <Stack 
                        className={ classes.quantityWrapper }
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography>16</Typography>
                        <Box color="text.disabled">
                            <Typography>All orders</Typography>
                        </Box>
                    </Stack>
                    <Stack 
                        className={ classes.quantityWrapper }
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography>16</Typography>
                        <Box color="text.disabled">
                            <Typography>All orders</Typography>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Main
