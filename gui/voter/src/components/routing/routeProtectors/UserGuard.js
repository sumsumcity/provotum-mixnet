import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'

export const UserGuard = ({children}) => {
    const user = useSelector(state => state.user.obj)

    if (user === null) {
        return <Navigate to="/login" replace />;
    }
    return children;
}
