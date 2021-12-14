import { constants } from './constants'
import { AnyAction } from 'redux'

interface Product {
    _id: string,
    name: string,
    price: string,
    imageSrc: string,
    ratingsQty: {
        1: number,
        2: number,
        3: number,
        4: number,
        5: number,
    },
    buyingsQty: number
}

interface HeaderState {
    isFixedMiddleBar: boolean,
    searchedProducts: {
        isSearching: boolean,
        isLoadingMore: boolean,
        quantity: number,
        list: Product[]
    }
}

const initialState: HeaderState = {
    isFixedMiddleBar: false,
    searchedProducts: {
        isSearching: false,
        isLoadingMore: false,
        quantity: 0,
        list: []
    }
}

export const reducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case constants.FIX_MIDDLE_BAR:
            return {
                ...state,
                isFixedMiddleBar: true
            }
        case constants.UNFIX_MIDDLE_BAR:
            return {
                ...state,
                isFixedMiddleBar: false
            }
        case constants.SEARCH_PRODUCTS_START:
            return {
                ...state,
                searchedProducts: {
                    ...state.searchedProducts,
                    isSearching: true
                }
            }
        case constants.SEARCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                searchedProducts: {
                    ...state.searchedProducts,
                    isSearching: false,
                    quantity: action.payload.quantity,
                    list: action.payload.products
                }
            }
        case constants.LOAD_MORE_PRODUCTS_START:
            return {
                ...state,
                searchedProducts: {
                    ...state.searchedProducts,
                    isLoadingMore: true
                }
            }
        case constants.LOAD_MORE_PRODUCTS_SUCCESS:
            return {
                ...state,
                searchedProducts: {
                    ...state.searchedProducts,
                    isLoadingMore: false,
                    list: [...state.searchedProducts.list, ...action.payload.products]
                }
            }
        case constants.RESET_SEARCHED_PRODUCTS:
            return{
                ...state,
                searchedProducts: {
                    ...initialState.searchedProducts
                }
            }
        default:
            return {
                ...state
            }
    }
}