import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from '../header/header'
import CartList from './cartlist'
import CartTotal from './carttotal'

const Cart = () => {

        const cart = useSelector(state => state.cart.data)

    return (
        <div>
           
            <Header/>
            
            {
                cart.length === 0 ?<div className="p-4"> <div className="p-4" style={{border:'1px solid gray', borderRadius:'10px'}}>

                        <h4>Cart is empty</h4>
                        <p><Link to="/shop">Add to cart</Link></p>
                        </div>
                </div>: <div className="p-4">
                
                
                <div className="row">

                    <div className="col-9">
                        <CartList/>
                    </div>
                    
                    <div className="col-3">
                        <CartTotal/>
                    </div>
                
                </div>
            
            </div>
       
            }
        </div>
    )
}

export default Cart
