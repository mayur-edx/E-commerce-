import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import AdminProtectedRoute from './admin.proceted.route'
import UserProtectedRoute from './user.proceted.route'


const AdminDarshboard = lazy(()=> import('./components/admin/home'))
const AddProduct = lazy(()=> import('./components/product/add.product'))
const ListProduct = lazy(()=> import('./components/product/list.product'))
const Login = lazy(() => import('./components/login'))
// const Home = lazy(()=> import('./components/user/home')) 
const Cart = lazy(() => import('./components/user/cart/cart'))
const Shop = lazy( () => import('./components/user/shop/shop'))
const ProductDetails = lazy(() => import('./components/product/product.details'))

const MainRoute = (props) => {

    // selector
    const state = useSelector(state => state.auth.user.users[0])
    
    // user Routes
    const userRoutes = [
      // {path:'/cart', component: Cart}
    ]

    // admin Routes
    const adminRoutes = [
        {path: "/admin-dashboard", component:AdminDarshboard},
        {path: "/add-product", component:AddProduct},
        {path: "/edit-product/:index", component:AddProduct},
        {path: "/list-products", component:ListProduct},
    ];

    return (<>
        
      <Route exact path="/" >
        {state.isAdmin ? state.authenticat ? <Redirect to="/admin-dashboard"/> : <Redirect to="/login"/> : <Shop/> }
      </Route>
        
      <Route exact path="/login" component={Login}/>

      <Route exact path="/cart" component={Cart} />

      <Route exact path="/products/:id" component={ProductDetails} />

        {/* admin all Route */}
        {
            adminRoutes.map((route,index) => {
              return <AdminProtectedRoute key={index} exact path={route.path} component={route.component}/>
            })
        }

        {/* user all Route */}
        {
          userRoutes.map((route, index) => {
            return <UserProtectedRoute key={index} exact path={route.path} component={route.component}/>
          })
        }
        
      </>)
    }
export default MainRoute
