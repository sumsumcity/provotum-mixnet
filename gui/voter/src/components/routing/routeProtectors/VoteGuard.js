import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'

export const VoteGuard = ({children}) => {
    const step = useSelector(state => state.step.value)

    if (step !== "Voting") {
        return <Navigate to="/login" replace />;
    }
    return children;
}
