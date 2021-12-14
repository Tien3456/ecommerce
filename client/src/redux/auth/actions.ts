import { constants } from './constants'
import { AppThunk } from '../store'
import { api } from '../../api/index'
import { handleStatus } from '../../shared/handleStatus'

export const actions = {
    doCheckAuth: (): AppThunk => async dispatch => {
        const { authenticated, user } = await api.get('/auth')
        authenticated
            ? dispatch({
                type: constants.AUTH_SUCCESS,
                payload: {
                    user
                }
            })
            : dispatch({
                type: constants.AUTH_FAILED,
                payload: {
                    authMessages: []
                }
            })
    },
    doSignIn: (
        email: string,
        password: string
    ): AppThunk => async dispatch => {
        dispatch({ type: constants.AUTH_START })
        const { 
            authenticated,
            user,
            token,
            authMessages
        } = await api.post('/auth/signin', { email, password })

        if(authenticated) {
            window.localStorage.setItem('token', token)
            dispatch({
                type: constants.AUTH_SUCCESS,
                payload: {
                    user
                }
            })
            return
        } 
        dispatch({
            type: constants.AUTH_FAILED,
            payload: { authMessages }
        })
    },
    doSignUp: (
        email: string,
        username: string,
        password: string
    ): AppThunk => async dispatch => {
        dispatch({ type: constants.AUTH_START })
        console.log(email, ' ', username, ' ', password)
        const { 
            authenticated,
            user,
            token,
            authMessages
        } = await api.post('/auth/signup', { email, username, password })
        if(authenticated) {
            window.localStorage.setItem('token', token)
            dispatch({
                type: constants.AUTH_SUCCESS,
                payload: {
                    token,
                    user
                }
            })
            return
        }
        dispatch({
            type: constants.AUTH_FAILED,
            payload: { authMessages }
        })
    },
    doResetMessages: () => {
        return {
            type: constants.RESET_AUTH_MESSAGES
        }
    }
}