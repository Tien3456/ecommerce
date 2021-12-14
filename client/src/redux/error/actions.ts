import { constants } from './constants'

export const actions = {
    doSetError: (status: number, msg: string) => {
        return {
            type: constants.SET_ERROR,
            payload: {
                status,
                msg
            }
        }
    },
    doResetError: () => {
        return {
            type: constants.RESET_ERROR_STATE
        }
    }
}