import { store } from '../redux/store'
import { actions as errorActions } from '../redux/error/actions'

export const handleStatus = (res: any) => {
    switch(res.status) {
        case 401:
            store.dispatch(errorActions.doSetError(401, ''))
            break
        case 404:
            store.dispatch(errorActions.doSetError(404, ''))
            break
        case 500:
            store.dispatch(errorActions.doSetError(500, ''))
            break
        default:
            break
    }
}