import { constants } from './constants'
import { AnyAction } from 'redux'

interface State {
    isOpen: boolean,
    child: "cart" | "signin" | null
}

const initialState: State = {
    isOpen: false,
    child: null
}

export const reducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case constants.SHOW_MODAL:
            return {
                ...state,
                isOpen: true,
                child: action.payload
            }
        case constants.CLOSE_MODAL:
            return {
                ...state,
                isOpen: false,
                child: null
            }
        default:
            return state
    }
}