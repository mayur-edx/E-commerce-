import {combineReducers} from 'redux'
import AuthReducer from './auth/reducer'
import CartReducer from './cart/reducer';
import CategoryReducer from './category/reducer';
import ProductReducer from './product/reducer';
import ToastReducer from './toast/reducer';

const rootReducer = combineReducers({
    auth : AuthReducer,
    product : ProductReducer,
    pcategory : CategoryReducer,
    cart : CartReducer,
    toast : ToastReducer
})

export default rootReducer;