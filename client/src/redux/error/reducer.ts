import { constants } from './constants'
import { AnyAction } from 'redux'

interface State {
    status: number | null,
    msg: string | null
}

const initialState: State = {
    status: null,
    msg: null
}

export const reducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case constants.SET_ERROR:
            return {
                ...action.payload
            }
        case constants.RESET_ERROR_STATE:
            return {...initialState}
        default:
            return state
    }
}