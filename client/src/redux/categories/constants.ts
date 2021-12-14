export enum constants {
    GET_CATEGORIES_START = 'GET_CATEGORIES_START',
    GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
    GET_PRODUCTS_START = 'GET_PRODUCTS_START',
    GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
    RESET_PRODUCTS = 'RESET_PRODUCTS'
}

export interface Product {
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