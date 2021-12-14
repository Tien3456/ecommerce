import { constants } from './constants'
import { AppThunk } from '../store'
import { api } from '../../api/index'
import { handleStatus } from '../../shared/handleStatus'

export const actions = {
    doGetCategories: (): AppThunk => async dispatch => {
        dispatch({ type: constants.GET_CATEGORIES_START })
        const { categories } = await api.get('/products/categories')
        dispatch({
            type: constants.GET_CATEGORIES_SUCCESS,
            payload: categories
        })
    },
    doGetProducts: (
        query: string,
        offset: number,
        limit: number
    ): AppThunk => async dispatch => {
        dispatch({ type: constants.GET_PRODUCTS_START })

        let url = query
        url.includes('?')
            ? url = url.concat(`&offset=${offset}&limit=${limit}`)
            : url = url.concat(`?offset=${offset}&limit=${limit}`)

        const { products, quantity } = await api.get(url)

        dispatch({
            type: constants.GET_PRODUCTS_SUCCESS,
            payload: {
                quantity,
                products
            }
        })
    },
    doResetProducts: () => {
        return {
            type: constants.RESET_PRODUCTS
        }
    }
}