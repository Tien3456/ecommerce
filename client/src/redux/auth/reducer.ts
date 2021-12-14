import { constants } from './constants'
import { AnyAction } from 'redux'

type user = {
    _id: string,
    username: string,
    avatarSrc: string,
    gender: 'male' | 'female'
}

type authMessage = {
    param: string,
    msg: string
}

interface State {
    isLoading: boolean,
    user: null | user,
    authenticated: boolean | null,
    authMessages: authMessage[]
}

const initialState: State = {
    isLoading: false,
    user: null,
    authenticated: null,
    authMessages: []
}

export const reducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case constants.AUTH_START:
            return {
                ...state,
                isLoading: true
            }
        case constants.AUTH_FAILED:
            return {
                ...state,
                isLoading: false,
                authenticated: false,
                user: null,
                authMessages: action.payload.authMessages
            }
        case constants.AUTH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                authenticated: true,
                user: action.payload.user,
                authMessages: []
            }
        case constants.RESET_AUTH_MESSAGES:
            return {
                ...state,
                authMessages: []
            }
        default:
            return {...state}
    }
}