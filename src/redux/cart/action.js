import { CART_INSERT, CART_PRODUCT_DECREMENT, CART_PRODUCT_DELETE, CART_PRODUCT_INCREMENT } from "./type"

export const onCartInsert = (data) => {
    return {
        type: CART_INSERT,
        payload: data
    }
}

export const onCartProductDelete = (data) => {
    return {
        type: CART_PRODUCT_DELETE,
        payload: data
    }
}

export const onCartProductIncrement = (data) => {
    return {
        type: CART_PRODUCT_INCREMENT,
        payload: data
    }
}

export const onCartProductDecrement = (data) => {
    return {
        type: CART_PRODUCT_DECREMENT,
        payload: data
    }
}