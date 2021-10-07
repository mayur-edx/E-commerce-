import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { onAdminLogOut } from '../../../redux/auth/action'
import './header.css'

const Header = () => {
    
    // dispatch
    const dispatch = useDispatch()

    // selector
    const cartNumber = useSelector(state =>  state.cart.data)
    const auth =  useSelector(state =>  state.auth.user.users[0].authenticat) 

    // methods or function
    const handleLogout = () => {
        dispatch(onAdminLogOut())
    }

    return (
     
        <div className="p-4 header-user" style={{display:'flex', justifyContent:'space-between'}}>
        
            <ul style={{listStyle:'none', display:'flex'}}>
                <li><Link to="shop">Shop</Link></li>
            </ul>
        
            <ul style={{listStyle:'none', display:'flex'}}>
                <li><Link to="cart"><i className="fas fa-shopping-cart"></i>{cartNumber && <span className="cart-number">{cartNumber.length}</span>}</Link></li>
                {auth ? <li onClick={handleLogout} style={{marginLeft:'10px'}}>Logout</li>:<li style={{marginLeft:'10px'}}> <Link to="/login" >Login</Link></li>}
    
            </ul>
        
        </div>
    )
}

export default Header
