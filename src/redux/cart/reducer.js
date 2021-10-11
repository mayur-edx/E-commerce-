import { CART_INSERT, CART_PRODUCT_DECREMENT, CART_PRODUCT_DELETE, CART_PRODUCT_INCREMENT } from "./type";

let cart = JSON.parse(localStorage.getItem('cart'))

const init_state =  cart ? cart :  {
    totalprice: null,
    totalquantity:null,
    data:[]
};

const CartReducer= (state = init_state, action) => {
    let newState = {...state};
    let {type,payload} =action;
    switch(type){

        case CART_INSERT:{            
            let cart = JSON.parse(localStorage.getItem('cart'))

            if(cart){
            
                let fatch =  cart.data.filter(data => data.id === payload.id)
                if(fatch < 1){

                
                
                let cartData = JSON.parse(localStorage.getItem('cart'));
            
                let payloadData = payload;

                payloadData.quantity = 1;
                payloadData.cartProductTotalPrice = Number(payloadData.totalPrice) * Number(payloadData.quantity)
                
                cartData.data.push(payloadData)
            
                let total = cartData.data.reduce((count,obj) => {count = count + obj.totalPrice;return count; },0)
                let quantity = cartData.data.reduce((count,obj) => {count = count + obj.quantity;  return count;},0)
                
                cartData.totalprice = total
                cartData.totalquantity = quantity
            
                localStorage.setItem('cart', JSON.stringify(cartData))
                newState = JSON.parse(localStorage.getItem('cart'))
            
                return newState
                }else{
                    return newState 
                }
            
            }else{
                let cart = {
                    totalprice: null,
                    totalquantity:null,
                    data:[]
                }
               
                let payloadData = payload;
                payloadData.quantity = 1;
                payloadData.cartProductTotalPrice = Number(payloadData.totalPrice) * Number(payloadData.quantity)
                cart.data.push(payload)
                cart.totalprice = payload.totalPrice
                cart.totalquantity = 1
            
                let cartData = JSON.stringify(cart)
                localStorage.setItem('cart', cartData)
                newState = JSON.parse(localStorage.getItem('cart'))
            
                return newState;
            }
        }

        case CART_PRODUCT_INCREMENT : {
            
            let cartData = JSON.parse(localStorage.getItem('cart'))
            let data = cartData.data
                
                data[payload].quantity = Number(data[payload].quantity) + 1
                data[payload].cartProductTotalPrice = data[payload].totalPrice * Number(data[payload].quantity) 

                let quantity = data.reduce((count, obj) => {count = count + obj.quantity; return count},0)
                let price = data.reduce((count,obj) => { count = count + obj.cartProductTotalPrice; return count},0)

                cartData.totalprice = price
                cartData.totalquantity = quantity

                localStorage.setItem('cart', JSON.stringify(cartData))

                newState = JSON.parse(localStorage.getItem('cart'))
                return newState;     
        }

        case CART_PRODUCT_DECREMENT : {
            let cartData = JSON.parse(localStorage.getItem('cart'))
            let data = cartData.data
            
            if(data[payload].quantity >1){

                data[payload].quantity = Number(data[payload].quantity) - 1
                data[payload].cartProductTotalPrice = data[payload].totalPrice * Number(data[payload].quantity) 

                let quantity =  data.reduce((count,obj) => { count = count + obj.quantity ;return count}, 0)
                let price = data.reduce((count,obj) => {count = count + obj.cartProductTotalPrice; return count },0)

                cartData.totalprice = price
                cartData.totalquantity = quantity

                localStorage.setItem('cart', JSON.stringify(cartData))

                newState =  JSON.parse(localStorage.getItem('cart'))
                return newState
            }

            newState = JSON.parse(localStorage.getItem('cart'))
            return newState
        }

        case CART_PRODUCT_DELETE: {
            
            let cartdata = JSON.parse(localStorage.getItem('cart')) 
            let data = cartdata.data

            let newdata = data.filter((item,idex) => item.cartID !== payload)
            let quantity = newdata.reduce((count, obj) => { count = count + obj.quantity;return count},0)
            let price = newdata.reduce((count, obj) => { count = count + obj.totalPrice;return count},0)
            
            cartdata.data = newdata
            cartdata.totalquantity = quantity;
            cartdata.totalprice = price;

            localStorage.setItem('cart', JSON.stringify(cartdata))
            newState = JSON.parse(localStorage.getItem('cart'))
            
            return newState;
        }

        default : return newState

    }
}

export default CartReducer;