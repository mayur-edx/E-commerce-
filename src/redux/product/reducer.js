import { PRODUCT_DELETE, PRODUCT_EDIT, PRODUCT_INSERT, PRODUCT_INSERT_INDEX } from "./type";

let lStorage = localStorage.getItem('products')

const init_state = {
    index: null,
    products: lStorage ? JSON.parse(lStorage): []
}
const ProductReducer = (state= init_state, action) => {
    let newstate= {...state};
    switch(action.type){
        case PRODUCT_INSERT: {
            if(localStorage.getItem('products')){
                let product = JSON.parse(localStorage.getItem('products'))
                product.push(action.payload)
                localStorage.setItem('products', JSON.stringify(product))
            }else {
             let temp = [action.payload]
            localStorage.setItem('products' ,JSON.stringify(temp))
        }
            let data =   [...newstate.products]
            data.push(action.payload)
            newstate.products = data
            return newstate;
        }
        case PRODUCT_DELETE:{
            let ldata = JSON.parse(localStorage.getItem('products'))
            let newldata =  ldata.filter((item) => item.id !== action.payload)
            localStorage.setItem('products',JSON.stringify(newldata))
            let temp = [...newstate.products]
            let data = temp.filter((item) => item.id !== action.payload );
            newstate.products = data
            return newstate;    
        }
        case PRODUCT_INSERT_INDEX : {

            newstate.index = action.payload
            return newstate;
        }
        case PRODUCT_EDIT:{
            let lstorage = JSON.parse(localStorage.getItem('products'))
            lstorage.splice(action.payload.index, 1,action.payload.data)
            localStorage.setItem('products', JSON.stringify(lstorage))
            newstate.products = lstorage
            return newstate;
        }
        default : return newstate;
    }
}

export default ProductReducer;  