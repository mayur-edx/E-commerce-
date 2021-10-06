import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import AdminProtectedRoute from './admin.proceted.route'
import Home from './components/user/home'
import Shop from './components/user/shop/shop'
import UserProtectedRoute from './user.proceted.route'

const AdminDarshboard = lazy(()=> import('./components/admin/home'))
const AddProduct = lazy(()=> import('./components/product/add.product'))
const ListProduct = lazy(()=> import('./components/product/list.product'))
const Login = lazy(() => import('./components/login'))

const MainRoute = (props) => {

    const adminRoutes = [
        {path: "/admin-dashboard", component:AdminDarshboard},
        {path: "/add-product", component:AddProduct},
        {path: "/edit-product/:index", component:AddProduct},
        {path: "/list-products", component:ListProduct},
      ];
      const userRoutes = [
        {path:'/home', component: Home},
        {path:'/shop', component: Shop}
      ]
    const state = useSelector(state => state.auth.user.users[0])
    return (<>
        <Route exact path="/" >
          {state.isAdmin ? state.authenticat ?  <Redirect to="/admin-dashboard"/>: <Redirect to="/login"/>:<Redirect to="/login"/> }
        </Route>
        <Route exact path="/login" component={Login}/>
    
        {
            adminRoutes.map((route,index) => {
              return <AdminProtectedRoute key={index} exact path={route.path} component={route.component}/>
            })
          }
{
  userRoutes.map((route, index) => {
    return <UserProtectedRoute key={index} exact path={route.path} component={route.component}/>
  })
}
          </>

    )
}

export default MainRoute
