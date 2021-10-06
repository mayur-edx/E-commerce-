import * as type from './type'

export const onAdminLogin = (data) => {
    return {
        type: type.ADMIN_LOGIN,
        payload: data
    }
}

export const onAdminLogOut = () => {
    return {
        type: type.ADMIN_LOGOUT
    }
}