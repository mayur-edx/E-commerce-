import { PRODUCT_DELETE, PRODUCT_EDIT, PRODUCT_INSERT, PRODUCT_INSERT_INDEX } from "./type"

export const onProductInsert = (data) => {
    return {
        type: PRODUCT_INSERT,
        payload: data
    }
}

export const onProductDelete = (data) => {
    return {
        type: PRODUCT_DELETE,
        payload: data
    }
} 

export const onProductInsertIndex = (data) => {
    return {
        type : PRODUCT_INSERT_INDEX,
        payload:data
    }
}

export const onProductEdit = (data) => {
    return {
        type: PRODUCT_EDIT,
        payload : data
    }
}