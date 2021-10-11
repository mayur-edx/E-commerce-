import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const CartTable = (props) => {
    
    // props
    let {index, data, handleCartDelete, handlQuantityIncrament, handleQuantityDecramenr} = props
    
    //  selector
    const categoryReducer = useSelector(state => state.pcategory)
    
    //  states
    const [category, setcategory] = useState(null)
    
    // useEffect
    useEffect(() => {
        let categoryName = categoryReducer.filter((item) => Number(item.id) === Number(data.categoryID)).map((item)=> item.name)
        categoryName && setcategory(categoryName)
        // eslint-disable-next-line 
    }, [categoryReducer])
    
    
    // console.log
    // console.log('ctegory' , category)
    
    return (
        <tr>
            <td><Link to={`/products/${data.id}`} style={{textDecoration:'none', color:'black'}}>{index +1}</Link></td>
            <td><Link to={`/products/${data.id}`} style={{textDecoration:'none', color:'black'}}>{data.name}</Link></td>
            <td><Link to={`/products/${data.id}`} style={{textDecoration:'none', color:'black'}}><img src={data.image} width="100px" alt={data.name} /></Link></td>
            <td><Link to={`/products/${data.id}`} style={{textDecoration:'none', color:'black'}}>{category}</Link></td>
            <td><Link to={`/products/${data.id}`} style={{textDecoration:'none', color:'black'}}>{data.totalPrice}</Link></td>
            <td>
                <button className="btn btn-sm btn-secondary" style={{marginRight:'10px'}} onClick={()=>handlQuantityIncrament(index)}>
                    <i className="fas fa-plus"></i>
                </button>
                {data.quantity}
                <button style={{marginLeft:'10px'}} className="btn btn-sm btn-secondary" onClick={()=>handleQuantityDecramenr(index)}>
                    <i className="fas fa-minus"></i>
                </button>
            </td>
            <td>${data.cartProductTotalPrice}</td>
            <td align="center" onClick={() => handleCartDelete(data.cartID)}><i class="fas fa-trash-alt text-danger"></i></td>
        </tr>
    )
}

export default CartTable
