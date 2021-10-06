import { CATEGORY_DELETE, CATEGORY_EDIT, CATEGORY_INSERT } from "./type"

export const onCategoryInsert = (data) => {
    console.log(data, 'action')
    return {
        type:CATEGORY_INSERT,
    
        payload: data 
    }  
}

export const onCategoryEdit = (data) => {
    return {
        type: CATEGORY_EDIT,
        payload:data
    }
}

export const onCategoryDelete = (data) => {
    return{
        type: CATEGORY_DELETE,
        payload : data
    }
}