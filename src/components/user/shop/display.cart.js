import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { onCartProductDecrement, onCartProductDelete, onCartProductIncrement } from '../../../redux/cart/action'
import './demo.css'
const DisplayCart = (props) => {
  
  //props  
  let {image, id, name, price , totalPrice, discount} = props.data
  
  //dispatch
  const dispatch = useDispatch()

  // history
  const history = useHistory()

  //selector 
  const cart = useSelector(state => state.cart)

  //state
  const [buttonFlag, setbuttonFlag] = useState(false)
  const [value, setvalue] = useState({
    index: null,
    quantity: null,
    cartID: null
  })
  
  //useEffect 
  useEffect(() => {
    let flag =  cart.data.filter(data =>  data.id === id)
    for(let i=0; i<= Number(cart.data.length-1); i++){
      if(cart.data[i].id === id){
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

  // methods and function all
  const handlQuantityIncrament = () => {
    dispatch(onCartProductIncrement(value.index))
  }

  const handleQuantityDecramenr = () => {
    dispatch(onCartProductDecrement(value.index))
  }
  
  const handleCartRemove = (data) => {
    dispatch(onCartProductDelete(data)) 
  }

  const handleImageClick = () => {
    history.push(`/products/${id}`)
  }
    return (
        <div className="card">

          <div style={{width: '100%', height:'200px', overflow:'hidden'}} className="p-4 demo" onClick={handleImageClick}>
           <img src={image} style={{image}} className="card-img-top" width="100%" height="100%" alt={name} />
          </div>
          
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text text-secondary">Price: <del>$.{price}</del></p>
            <p className="card-text text-secondary">Discount: {discount}%</p>
            <p className="card-text text-secondary">TotalPrice: ${totalPrice}</p>
          </div>
          
          <div className="card-footer">
          
            {buttonFlag 
            ? <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}> 
              <div>
              <button className="btn btn-sm btn-secondary" style={{marginRight:'10px'}} onClick={handlQuantityIncrament}>
                <i className="fas fa-plus"></i>
              </button>
              {value.quantity}
              <button style={{marginLeft:'10px'}} className="btn btn-sm btn-secondary" onClick={handleQuantityDecramenr}>
                <i className="fas fa-minus"></i>
              </button>
              </div>
              <i className="fas fa-trash-alt text-danger " onClick={() =>  handleCartRemove(value.cartID)}></i>
            </div> 
            : <button className="btn btn-primary" onClick={() => props.handleAddCart(props.data)} >
              <i className="fas fa-shopping-cart" style={{marginRight: '10px'}}></i>Add to cart
            </button>
            }
          
          </div>
        
        </div>
    )
}

export default DisplayCart
