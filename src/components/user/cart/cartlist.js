import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onCartProductDecrement, onCartProductDelete, onCartProductIncrement } from '../../../redux/cart/action'
import CartTable from './carttable'

const CartList = () => {
    
    // dispatch
    const dispatch = useDispatch()
    
    // selector
    const cartReducer = useSelector(state => state.cart.data)
   
    // state
    const [cart, setcart] = useState([])

    // useEffects
    useEffect(() => {
        if(cartReducer){
            setcart(cartReducer)
        }
    }, [cartReducer])

    //methos or function
    const handleCartDelete = (id) =>{
        dispatch(onCartProductDelete(id))
    }

    const handlQuantityIncrament = (data) => {
        dispatch(onCartProductIncrement(data))
    }

    const handleQuantityDecramenr = (data) => {
        dispatch(onCartProductDecrement(data))
    }

    // console.log all
    console.log('cart', cart);
    console.log('cartreducer',cartReducer);
    
    return (
        <div className="p-4" style={{border:'1px solid gray', borderRadius:'10px'}}>
            
            <h1 className="text-center my-3">Product Cart</h1>
            
            <div className="table-responsive">
            
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((data,index) => (
                                <CartTable data={data} key={index} index={index} handlQuantityIncrament={handlQuantityIncrament} handleQuantityDecramenr={handleQuantityDecramenr} handleCartDelete={handleCartDelete}/>
                            ))
                        }
                    </tbody>
               </table>
           
            </div>
        </div>
    )
}

export default CartList
