import { constants } from './constants'
import { AppThunk } from '../store'
import { api } from '../../api'
import { handleStatus } from '../../shared/handleStatus'

export const actions = {
    doFixMiddleBar: () => {
        return {
            type: constants.FIX_MIDDLE_BAR
        }
    },
    doUnfixMiddleBar: () => {
        return {
            type: constants.UNFIX_MIDDLE_BAR
        }
    },
    doSearchProducts: (
        name: string, 
        category: string,
        offset: number,
        limit: number
    ): AppThunk => async dispatch => {
        if(!name) {
            dispatch({ type: constants.RESET_SEARCHED_PRODUCTS })
            return
        }
        let startedType: string, successfulType: string

        switch(offset === 0) {
            case true:
                startedType = constants.SEARCH_PRODUCTS_START
                successfulType = constants.SEARCH_PRODUCTS_SUCCESS
                break
            default:
                startedType = constants.LOAD_MORE_PRODUCTS_START
                successfulType = constants.LOAD_MORE_PRODUCTS_SUCCESS
                break
        }
        dispatch({ type: startedType })
        const url = `/search?name=${name}&category=${category}&offset=${offset}&limit=${limit}`
        const { products, quantity } = await api.get(url)
        dispatch({
            type: successfulType,
            payload: {
                products
            }
        })
    }
}