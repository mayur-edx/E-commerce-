import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { onAdminLogOut } from '../../../redux/auth/action'

const Header = () => {
    const dispatch = useDispatch()

    const [cartNumber, setcartNumber] = useState(null)
    

    const handleLogout = () => {
        dispatch(onAdminLogOut())
    }
    return (
        <div className="p-4" style={{display:'flex', justifyContent:'space-between'}}>
            <ul style={{listStyle:'none', display:'flex'}}>
                <li><Link to="shop">Shop</Link></li>
            </ul>
            <ul style={{listStyle:'none', display:'flex'}}>
                <li><Link to="cart"><i className="fas fa-shopping-cart"></i>{cartNumber && <span>{cartNumber}</span>}</Link></li>
                <li onClick={handleLogout} style={{marginLeft:'10px'}}>Logout</li>
            </ul>
        </div>
    )
}

export default Header
