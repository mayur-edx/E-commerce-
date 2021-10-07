import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onCartInsert } from '../../../redux/cart/action'
import Header from '../header/header'
import DisplayCart from './display.cart'

const Shop = () => {    
  
    // dispatch
    const dispatch = useDispatch()
    
    // Reducer
    const productsReducer = useSelector(state => state.product.products)
    
    // states  
    const [products, setproducts] = useState([])
  
    // useEffeact
    useEffect(() => {
        productsReducer && setproducts(productsReducer)
    }, [productsReducer])

    // method or function
    const handleAddCart = (data) => {
        let id = Math.ceil(Math.random() * 100000)
        data.cartID = id 
        dispatch(onCartInsert(data))
    }
    
    return (
        <div>
            <Header  />
            <div className="p-5">
                <h1>Shop compoent</h1>
                <div className="row">

                    {products.map((data,index) => (
                        <div className="card-group col-xl-2 col-lg-3 col-md-2 col-sm-4 mb-4" key={index} >
                        <DisplayCart handleAddCart={handleAddCart} data={data}  />
                    </div>
                    ))}
                
                </div>
            </div>
        </div>
    )
}   

export default Shop
