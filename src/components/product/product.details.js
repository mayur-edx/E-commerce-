import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { onCartInsert, onCartProductDecrement, onCartProductDelete, onCartProductIncrement } from '../../redux/cart/action'
import Header from './../user/header/header'

const ProductDetails = () => {
    
    // useParams
    const params = useParams()

    // dispatch 
    const dispatch = useDispatch()

    //selector 
    const cart = useSelector(state => state.cart)
    const productsReducer = useSelector(state => state.product.products)

    // states
    const [product, setproduct] = useState({}) 
    const [buttonFlag, setbuttonFlag] = useState(false)
    const [value, setvalue] = useState({
      index: null,
      quantity: null,
      cartID: null
    })

    //useEffect 
    useEffect(() => {
        let products =  productsReducer.find(data => data.id === Number(params.id))
        setproduct(products)
        // eslint-disable-next-line 
    }, [params])

    useEffect(() => {
        let flag =  cart.data.filter(data =>  data.id === Number(params.id))
        for(let i=0; i<= Number(cart.data.length-1); i++){
        if(cart.data[i].id === Number(params.id)){
            setvalue({
            index: i,
            quantity: cart.data[i].quantity,
            cartID : cart.data[i].cartID
            })
        }
        }

        if(flag.length !== 0 ){ 
        setbuttonFlag(true)
        }else{
        setbuttonFlag(false)
        }
        // eslint-disable-next-line 
    }, [cart])


    //method
    const handleAddCart = (data) => {
        let products = product
        let id = Math.ceil(Math.random() * 100000)
        products.cartID = id 
        dispatch(onCartInsert(products))
    }
    const handleCartRemove = () => {
        let flag =  cart.data.find(data =>  data.id === Number(params.id))
        dispatch(onCartProductDelete(flag.cartID)) 
    }
    const handlQuantityIncrament = () => {
        dispatch(onCartProductIncrement(value.index))
    }
    const handleQuantityDecramenr = () => {
        dispatch(onCartProductDecrement(value.index))
    }

    return (
        <div>
            <Header/>
            <div className="p-4">
                <div className="row">
                    <div className="col-lg-5" >
                        <img src={product.image} width="100%" alt={product.name} />
                    </div>
                    <div className="col-lg-7 p-4" style={{border: '1px solid #f7f7f7',backgroundColor: '#f7f7f7'}}>
                       
                        <h1 className="text-danger">{product.name}</h1>
                       
                        <h2>${product.totalPrice}</h2>
                       
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga debitis dolor quos. Molestiae rerum sapiente consequatur delectus consequuntur! Vero sed nemo officia voluptatem iste suscipit a eum, ipsum quibusdam deleniti?</p>
                        
                        {buttonFlag 
                            ? <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}> 
                            
                                <div style={{display:'flex', alignItems:'baseline'}}>
                                    <button className="btn btn-sm btn-secondary" style={{marginRight:'10px'}} onClick={handlQuantityIncrament}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                
                                    <span style={{border: '1px solid gray ',borderRadius:'4px',textAlign:'center', width:'50px',fontWeight:'bold'}} className="bg-white">{value.quantity}</span>
                                
                                    <button style={{marginLeft:'10px'}} className="btn btn-sm btn-secondary" onClick={handleQuantityDecramenr}>
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                                
                                <i className="fas fa-trash-alt text-danger " onClick={() =>  handleCartRemove()}></i>
                            
                            </div> 
                            : <button className="btn btn-primary" onClick={() => handleAddCart()} >
                                <i className="fas fa-shopping-cart" style={{marginRight: '10px'}}></i>
                                Add to cart
                            </button>
                        }
          
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
