import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

const UserProtectedRoute = (  {component: Component,
    ...reset}) => {

    const auth = useSelector(state => state.auth.user)
    return (
        <Route  {...reset} render={props => {
            if(!auth.users[0].isAdmin){
            if(auth.users[0].authenticat){
                return <Component {...props}/>
                }
                return <Redirect to="/login"/>
            }else{
                <Redirect to="/login"/>
            }
        }} />
    )
}

export default UserProtectedRoute
