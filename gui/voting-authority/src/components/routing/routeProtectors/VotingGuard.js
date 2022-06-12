import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'

export const VotingGuard = ({children}) => {
    const step = useSelector(state => state.step.value)

    if (step !== "Voting") {
        return <Navigate to="/result" replace />;
    }
    return children;

}
