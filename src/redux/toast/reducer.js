import { TOAST_DELETE, TOAST_EDIT, TOAST_FALSE, TOAST_INSERT, TOAST_LOGIN, TOAST_LOGOUT, TOAST_TRUE } from "./type";

const init_state = {
    show: false,
    message: ''
}

const ToastReducer = (state = init_state, action) => {
    let newstate = {...state}
    let type = action.type;
    switch(type){
        case TOAST_TRUE : {newstate.show = true;  return newstate;}
        case TOAST_FALSE : {newstate.show = false ; return newstate;}
        case TOAST_INSERT:{ newstate.message = 'product is insert successfully...';  return newstate;}
        case TOAST_EDIT:{ newstate.message = 'product is updated successfully...';  return newstate;}
        case TOAST_DELETE:{ newstate.message = 'product is deleted successfully...';  return newstate;}
        case TOAST_LOGIN:{newstate.message = 'Login is succesfully...'; return newstate;}
        case TOAST_LOGOUT:{newstate.message = 'Logout is succesfull...'; return newstate;}
        default : return newstate;
    }
}

export default ToastReducer;