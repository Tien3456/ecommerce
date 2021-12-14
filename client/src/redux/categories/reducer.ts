import { constants, Product } from './constants'
import { AnyAction } from 'redux'

interface State {
    categories: {
        isLoading: boolean,
        list: string[]
    },
    products: {
        isLoading: boolean,
        list: Product[],
        quantity: number
    }
}

const initialState: State = {
    categories: {
        isLoading: false,
        list: []
    },
    products: {
        isLoading: false,
        list: [],
        quantity: 0
    }
}

export const reducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case constants.GET_CATEGORIES_START:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    isLoading: true
                }
            }
        case constants.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    isLoading: false,
                    list: action.payload
                }
            }
        case constants.GET_PRODUCTS_START:
            return {
                ...state,
                products: {
                    ...state.products,
                    isLoading: true
                }
            }
        case constants.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: {
                    ...state.products,
                    isLoading: false,
                    list: action.payload.products,
                    quantity: action.payload.quantity
                }
            }
        case constants.RESET_PRODUCTS:
            return {
                ...state,
                products: {
                    ...initialState.products
                }
            }
        default:
            return state
    }
}