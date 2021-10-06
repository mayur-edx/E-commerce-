import {combineReducers} from 'redux'
import AuthReducer from './auth/reducer'
import CategoryReducer from './category/reducer';
import ProductReducer from './product/reducer';
import ToastReducer from './toast/reducer';

const rootReducer = combineReducers({
    auth : AuthReducer,
    productCategory : CategoryReducer,
    product : ProductReducer,
    toast : ToastReducer
})

export default rootReducer;