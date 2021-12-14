import { constants } from './constants'
import { api } from '../../api/index'
import { AppThunk } from '../store'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction, Action } from 'redux'
import { handleStatus } from '../../shared/handleStatus'

export interface Product {
    _id: string,
    name: string,
    price: number,
    imageSrc: string,
    ratingsQty: {
        1: number,
        2: number,
        3: number,
        4: number,
        5: number
    },
    category: string,
    salePercent: number
}

export interface Category {
    category: string,
    buyingsQty: number,
    products: Product[]
}

export const actions = {
    doGetFlashDeals: (
        offset: number, 
        limit: number
    ): AppThunk => {
        return async (dispatch) => {
            dispatch({ type: constants.GET_FLASH_DEALS_START })
            const { 
                products
            } = await api.get(`/products?offset=${offset}&limit=${limit}&topSaling=true`)
            dispatch({
                type: constants.GET_FLASH_DEALS_SUCCESS,
                payload: products
            })
        }
    },
    doGetTopCategory: (): AppThunk => async dispatch => {
        dispatch({ type: constants.GET_TOP_CATEGORIES_START })

        const { products } = await api.get('/top-categories')
        dispatch({
            type: constants.GET_TOP_CATEGORIES_SUCCESS,
            payload: products
        })
    },
    doGetTopRatingCategories: (): AppThunk => async dispatch => {
        dispatch({ type: constants.GET_TOP_RATING_START })
        const { products } = await api.get('/top-rating-categories')
        dispatch({
            type: constants.GET_TOP_RATING_SUCCESS,
            payload: products
        })
    },
    doGetNewArrivals: (
        offset: number,
        limit: number
    ): AppThunk => async dispatch => {
        dispatch({ type: constants.GET_NEW_ARRIVALS_START })
        const { products } = await api.get(`/products?newest=true&offset=${offset}&limit=${limit}`)
        dispatch({
            type: constants.GET_NEW_ARRIVALS_SUCCESS,
            payload: products
        })
    },
    doResetHomeState: () => {
        return { type: constants.RESET_HOME_STATE }
    }
}