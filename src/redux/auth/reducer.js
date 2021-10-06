import * as type from './type'
const init_state = {
    user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))  : {users:[ {email: '',
    password: '',
    authenticat: false,
    isAdmin: false}]}
}

const AuthReducer = (state = init_state, action) => {
    let newState = {
        ...state
    }
    switch (action.type) {
        case type.ADMIN_LOGIN:
            {
                const usersData = {
                    users: [
                        {
                            email: action.payload.email,
                            password: action.payload.password,
                            authenticat: true,
                            isAdmin: action.payload.isAdmin==='true' ?true : false
                        },
                    ]
                }
                localStorage.setItem('user', JSON.stringify(usersData))
                newState.user = usersData
                return newState;
            }
        case type.ADMIN_LOGOUT:
            {
                localStorage.removeItem('user');
                newState  = {
                    user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))  : {users:[ {email: '',
                    password: '',
                    authenticat: false,
                    isAdmin: false}]}
                }
                return newState;
            }
        default:
            return newState;
    }
}

export default AuthReducer;
