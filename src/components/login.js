import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {emailValidator, passwordValidator} from '../constant'
import {onAdminLogin} from '../redux/auth/action'
import { onToastLogin, onToastTrue } from '../redux/toast/action'
import {validation} from './validation'

const Login = (props) => {
    const dispatch = useDispatch()
    const [value, setvalue] = useState({email: '', password: '', isAdmin: ''})
    const [error, seterror] = useState({email: '', password: '', isAdmin: ''})
    const handleChnage = (e) => {
        setvalue({
            ...value,
            [e.target.name]: e.target.value
        })
        seterror({
            ...error,
            [e.target.name]: ''
        })
    }
    const handleSubmit = () => {

        console.log(validation(value),'valdation')
        if (!value.email && !value.password && !value.isAdmin) {
            seterror({password: 'pasword is required filed...', email: 'email is required filed...', isAdmin: 'admin is rquired filed...'})
        } else if (!value.email) {
            seterror({
                ...error,
                email: 'Email is required Filed...'
            })
        } else if (!value.isAdmin) {
            seterror({
                ...error,
                isAdmin: 'isAdmin is required Filed...'
            })
        } else if (!value.password) {
            seterror({
                ...error,
                password: 'Password is required filed...'
            })
        } else if (!emailValidator.test(String(value.email).toLowerCase())) {
            seterror({
                ...error,
                email: 'Email is invalid...'
            })
        } else if (!passwordValidator.test(value.password)) {
            seterror({
                ...error,
                password: 'Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
            })
        } else {
            debugger;
            if(value.isAdmin === true){
            dispatch(onAdminLogin(value))
            dispatch(onToastLogin())
            dispatch(onToastTrue())
            
            props.history.push('/admin-dashboard')
            }else{

                dispatch(onAdminLogin(value))
                dispatch(onToastLogin())
                dispatch(onToastTrue())
                props.history.push('/home')        
            }
        }
    }
    return (
        <div className="login" style={{backgroundColor: 'rgb(100 216 225)'}}>
            <div className="form-login p-4" style={{backgroundColor:'white', borderRadius:'10px', width:'400px'}}>
                <h1 className="text-center my-3">Login Form</h1>
                <input className="form-control" placeholder
                ="Enter email" type="text" name="email"
                    onChange={handleChnage}
                    value={
                        value.email
                    }/>
                <span style={
                    {color: 'red', marginBottom: '10px'}
                }>
                    {
                    error.email
                }</span>

                <input className="form-control" placeholder="Enter password" type="password" name="password"
                    onChange={handleChnage}
                    value={
                        value.password
                    }/>
                     <span style={
                    {color: 'red' , marginBottom: '10px'}
                }>
                    {
                    error.password
                }</span>
                <div>
                    <span>Admin</span>
                    <input style={{marginLeft:'10px'}} type="radio" name="isAdmin" value="true"
                        onChange={handleChnage}
                        id="true"/><label htmlFor="true">Yes</label>
                    <input style={{marginLeft:'10px'}} type="radio" name="isAdmin" value='false' id="false"
                        onChange={handleChnage}/><label htmlFor="false">No</label>
                    <div style={
                        {color: 'red', marginBottom: '20px'}
                    }>

                    <span>
                        {
                            error.isAdmin
                        }</span>
                        </div>
                </div>

               
                <Button onClick={handleSubmit}>Login</Button>
            </div>

        </div>
    )
}

export default Login
