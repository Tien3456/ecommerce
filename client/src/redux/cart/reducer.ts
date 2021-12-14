import { constants, CartItem } from './constants'
import { AnyAction } from 'redux'

const getStoredCart = () => {

    let storedCart: any
    
    storedCart = window.localStorage.getItem('cart')
    console.log(storedCart)
    storedCart && Array.isArray(JSON.parse(storedCart))
        ? storedCart = JSON.parse(storedCart)
        : storedCart = []

    return storedCart
}

const initialState: CartItem[] = getStoredCart()

export const reducer = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case constants.ADD_ITEM_TO_CART: {
            const { _id: newItemId } = action.payload
            const storedItems = getStoredCart()
            const currentItem = storedItems.find((item: CartItem) => item._id === newItemId)
            if(currentItem) {
                const currentItemIndex = storedItems.indexOf(currentItem)
                storedItems[currentItemIndex].quantity ++
            } else {
                storedItems.push(action.payload)
            }
            window.localStorage.setItem('cart', JSON.stringify(storedItems))
            return [...storedItems]
        }
        case constants.DECREASE_ITEM_FROM_CART: {
            const removedItemId = action.payload
            const storedItems = getStoredCart()
            const currentItem = storedItems.find((item: CartItem) => item._id === removedItemId)
            if(currentItem) {
                const currentItemIndex = storedItems.indexOf(currentItem)
                storedItems[currentItemIndex].quantity > 1
                    ? storedItems[currentItemIndex].quantity --
                    : storedItems.splice(currentItemIndex, 1)
            }
            window.localStorage.setItem('cart', JSON.stringify(storedItems))
            return [...storedItems]
        }
        case constants.REMOVE_ITEM_FROM_CART: {
            const removedItemId = action.payload
            const storedItems = getStoredCart()
            const currentItem = storedItems.find((item: CartItem) => item._id === removedItemId)
            if(currentItem) {
                const currentItemIndex = storedItems.indexOf(currentItem)
                storedItems.splice(currentItemIndex, 1)
            }
            window.localStorage.setItem('cart', JSON.stringify(storedItems))
            return [...storedItems]
        }
        default:
            return state
    }
}