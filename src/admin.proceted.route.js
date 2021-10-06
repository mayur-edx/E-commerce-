import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router";

const AdminProtectedRoute = ({
    component: Component,
    ...reset
}) => {
    const isLogin = useSelector(state => state.auth.user.users[0].authenticat)
    const isAdmin = useSelector(state => state.auth.user.users[0].isAdmin)


    return (
        <>
            <Route {...reset}
                render={
                    (props) => {
                        if (isAdmin) {
                            if (isLogin) {
                                return <Component {...props}/>
                        } else {
                            return <Redirect to="/login"/>
                    }
                } else {
                    return <Redirect to="/login"/>
            }
        }
                }/>
        </>
    )
}
export default AdminProtectedRoute;
