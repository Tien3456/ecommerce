import { Product, Category } from './actions'
import { constants } from './constants'
import { AnyAction } from 'redux'

interface State {
    flashDeal: {
        isLoading: boolean,
        products: Product[]
    },
    topCategory: {
        isLoading: boolean,
        categories: Category[]
    },
    topRating: {
        isLoading: boolean,
        products: Product[]
    },
    newArrival: {
        isLoading: boolean,
        products: Product[]
    }
}

const initialState: State = {
    flashDeal: {
        isLoading: false,
        products: []
    },
    topCategory: {
        isLoading: false,
        categories: []
    },
    topRating: {
        isLoading: false,
        products: []
    },
    newArrival: {
        isLoading: false,
        products: []
    }
}

export const reducer = (state = initialState, action: AnyAction): State => {
    switch(action.type) {
        case constants.GET_FLASH_DEALS_START:
            return {
                ...state,
                flashDeal: {
                    ...state.flashDeal,
                    isLoading: true
                }
            }
        case constants.GET_FLASH_DEALS_SUCCESS:
            return {
                ...state,
                flashDeal: {
                    ...state.flashDeal,
                    isLoading: false,
                    products: action.payload
                }
            }
        case constants.GET_TOP_CATEGORIES_START:
            return {
                ...state,
                topCategory: {
                    ...state.topCategory,
                    isLoading: true
                }
            }
        case constants.GET_TOP_CATEGORIES_SUCCESS:
            return {
                ...state,
                topCategory: {
                    ...state.topCategory,
                    isLoading: false,
                    categories: action.payload
                }
            }
        case constants.GET_TOP_RATING_START:
            return {
                ...state,
                topRating: {
                    ...state.topRating,
                    isLoading: true
                }
            }
        case constants.GET_TOP_RATING_SUCCESS:
            return {
                ...state,
                topRating: {
                    ...state.topRating,
                    isLoading: false,
                    products: action.payload
                }
            }
        case constants.GET_NEW_ARRIVALS_START:
            return {
                ...state,
                newArrival: {
                    ...state.newArrival,
                    isLoading: true
                }
            }
        case constants.GET_NEW_ARRIVALS_SUCCESS:
            return {
                ...state,
                newArrival: {
                    ...state.newArrival,
                    isLoading: false,
                    products: action.payload
                }
            }
        case constants.RESET_HOME_STATE:
            return {...initialState}
        default:
            return state
    }
}