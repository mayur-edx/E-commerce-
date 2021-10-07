import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CartTotal = () => {

    // selector
    const cart = useSelector(state => state.cart)

    // states
    const [value, setvalue] = useState({
        totalquantity:null,
        totalprice:null
    })

    // useEffect
    useEffect(() => {
        if(cart){
            setvalue({
                totalprice: cart.totalprice,
                totalquantity:cart.totalquantity
            })
        }
    }, [cart])

    return (
        <div className="p-4" style={{border:'1px solid gray', borderRadius:'10px'}}>
            <h4 className="text-center my-3">Total Bill</h4>
            <hr/>
            <div style={{display:'flex', justifyContent:'space-between'}}><span>Product Quantity:</span> <span>{value.totalquantity}</span></div>
            <hr/>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}><span>Total Price:</span> <span>${value.totalprice}</span></div>
        </div>
    )
}

export default CartTotal
