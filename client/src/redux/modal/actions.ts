import { constants } from './constants'

export const actions = {
    doShowModal: (payload: string) => {
        return {
            type: constants.SHOW_MODAL,
            payload
        }
    },
    doCloseModal: () => {
        return {
            type: constants.CLOSE_MODAL
        }
    }
}