import { TOAST_DELETE, TOAST_EDIT, TOAST_FALSE, TOAST_INSERT, TOAST_LOGIN, TOAST_LOGOUT, TOAST_TRUE } from "./type"

export const onToastEdit = () => {
    return {
        type:TOAST_EDIT
    }
}

export const onToastDelete = () => {
    return {
        type: TOAST_DELETE
    }
}

export const onToastInsert = () => {
    return {
        type: TOAST_INSERT
    }
}

export const onToastTrue = () => {
    return {
        type: TOAST_TRUE
    }
}

export const onToastFalse = () =>{
    return{
        type: TOAST_FALSE
    }
}

export const onToastLogin = () => {
    return {
        type: TOAST_LOGIN
    }
}

export const onToastLogout = () => {
    return {
        type: TOAST_LOGOUT
    }
}