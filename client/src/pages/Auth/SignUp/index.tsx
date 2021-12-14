import React, { useState, useContext, useEffect } from 'react'
import { 
    Box, Paper, Stack, Container, 
    Typography, OutlinedInput, Button,
    useTheme, useMediaQuery
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useStyles } from '../styles/index'
import { AppContext } from '../../../GlobalContext'
import {
    useAppThunkDispatch,
    useAppDispatch as useDispatch,
    useAppSelector as useSelector
} from '../../../redux/hooks'
import { actions } from '../../../redux/auth/actions'

const SignUp = () => {

    const theme = useTheme()
    const isGreaterThanXs = useMediaQuery(theme.breakpoints.up('sm'))
    const classes = useStyles()
    const thunkDispatch = useAppThunkDispatch()
    const dispatch = useDispatch()

    const { windowSize } = useContext(AppContext)
    const { isLoading, authMessages } = useSelector(state => state.auth)
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        return () => {
            dispatch(actions.doResetMessages())
        }
    }, [])

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        thunkDispatch(actions.doSignUp(email, username, password))
        setEmail('')
        setUsername('')
        setPassword('')
    }

    const formGroup = (
        <>
            <Stack
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%", height: "100%" }}
            >
                <Box mb={ 1 } className="heading-wrapper">
                    <Typography component="h2" variant="h6">
                        Create an account
                    </Typography>
                </Box>
                <Box mb={ 3 } className="title-wrapper">
                    <Typography>Please fill all fields to continue</Typography>
                </Box>
                <form 
                    style={{ width: "100%" }}
                    onSubmit={ handleSubmit }
                >
                    <Box mb={ 1 } className="label-wrapper">
                        <Typography>Email or phone number</Typography>
                    </Box>
                    <Box mb={ 1 } className="input-wrapper">
                        <OutlinedInput 
                            type="text" placeholder="example@gmail.com" required
                            onChange={ handleEmailChange }
                            value={ email }
                        />
                    </Box>
                    {
                        authMessages.find((authMessage: any) => authMessage.param === 'email') &&
                            <Box mb={ 1 } className="error-wrapper">
                                <Typography>
                                    { authMessages.find((authMessage: any) => authMessage.param === 'email').msg }
                                </Typography>
                            </Box>
                    }
                    <Box mb={ 1 } className="label-wrapper">
                        <Typography>Username</Typography>
                    </Box>
                    <Box mb={ 1 } className="input-wrapper">
                        <OutlinedInput 
                            type="text" placeholder="John Doe" required
                            onChange={ handleUsernameChange }
                            value={ username }
                        />
                    </Box>
                    {
                        authMessages.find((authMessage: any) => authMessage.param === 'username') &&
                            <Box mb={ 1 } className="error-wrapper">
                                <Typography>
                                    { authMessages.find((authMessage: any) => authMessage.param === 'username').msg }
                                </Typography>
                            </Box>
                    }
                    <Box mb={ 1 } className="label-wrapper">
                        <Typography>Password</Typography>
                    </Box>
                    <Box mb={ 2 } className="input-wrapper">
                        <OutlinedInput 
                            type="password" placeholder="********" required
                            onChange={ handlePasswordChange }
                            value={ password }
                        />
                    </Box>
                    {
                        authMessages.find((authMessage: any) => authMessage.param === 'password') &&
                            <Box mb={ 1 } className="error-wrapper">
                                <Typography>
                                    { authMessages.find((authMessage: any) => authMessage.param === 'password').msg }
                                </Typography>
                            </Box>
                    }
                    <Box mb={ 1 } className="button-wrapper">
                        <Button 
                            type="submit" className="btn-local-login"
                            disabled={ isLoading }
                        >
                            Create
                        </Button>
                    </Box>
                    <Box mb={ 1 } className="divider-wrapper">
                        <Stack 
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ width: "100%", color: "text.disabled" }}
                        >
                            <span className="divider"></span>
                            <span>on</span>
                            <span className="divider"></span>
                        </Stack>
                    </Box>
                    <Box mb={ 2 } className="button-wrapper">
                        <Button className="btn-facebook-login">
                            <img src="/images/facebook-filled-white.svg" />
                            &nbsp;&nbsp;Continue with facebook
                        </Button>
                    </Box>
                    <Box mb={ 1 } className="button-wrapper">
                        <Button className="btn-google-login">
                            <img src="/images/google-1.svg" />
                            &nbsp;&nbsp;Continue with google
                        </Button>
                    </Box>
                </form>
                <Box className="link-wrapper" color="text.disabled">
                    <Typography>Have account? <Link to="/signin">Sign in</Link></Typography>
                </Box>
            </Stack>
        </>
    )

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                width: windowSize.width,
                height: windowSize.height,
                background: "#F6F9FC"
            }}
        >
            <Paper 
                elevation={ 0 }
                className={ classes.formWrapper }
            >
                {
                    isGreaterThanXs
                        ? <>{ formGroup }</>
                        : <Container sx={{ height: "100%" }}>
                            { formGroup }
                        </Container>
                }
            </Paper>
        </Stack>
    )
}

export default SignUp