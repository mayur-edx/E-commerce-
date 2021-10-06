import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {onAdminLogOut} from '../../redux/auth/action'
import './header.css'

const Header = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.user.users[0].email)
    return (
        <div className="header">
            <ul>
                <li>
                    <Link to="/admin-dashboard">Darshboard</Link>
                </li>
                <li style={
                    {margin: '0 20px'}
                }>
                    <Link to="/add-product">Add Product</Link>
                </li>
                <li>
                    <Link to="/list-products">List Products</Link>
                </li>
            </ul>
            <ul>
                <li>{auth}</li>
                <li style={
                    {marginLeft: '20px'}
                }>
                    <Link to="#"
                        onClick={
                            () => dispatch(onAdminLogOut())
                    }>Logout</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header
