import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'

export const LoginGuard = ({children}) => {
    const user = useSelector(state => state.user.obj)

    if (user !== null) {
        return <Navigate to="/home" replace />;
    }
    return children;
}
