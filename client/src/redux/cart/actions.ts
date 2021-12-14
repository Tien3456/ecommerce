import { constants, CartItem } from './constants'

export const actions = {
    doAddItemToCart: (payload: CartItem) => {
        return {
            type: constants.ADD_ITEM_TO_CART,
            payload
        }
    },
    doDecreaseItemFromCart: (payload: string) => {
        return {
            type: constants.DECREASE_ITEM_FROM_CART,
            payload
        }
    },
    doRemoveItemFromCart: (payload: string) => {
        return {
            type: constants.REMOVE_ITEM_FROM_CART,
            payload
        }
    }
}