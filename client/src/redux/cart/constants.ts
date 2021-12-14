export enum constants {
    ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART',
    DECREASE_ITEM_FROM_CART = 'DECREASE_ITEM_FROM_CART',
    REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART'
}

export interface CartItem {
    _id: string,
    name: string,
    currentPrice: number,
    quantity: number,
    imageSrc: string
}