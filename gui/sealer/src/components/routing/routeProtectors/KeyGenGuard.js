import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'

export const KeyGenGuard = ({children}) => {
    const step = useSelector(state => state.step.value)

    if (step === "Vote Creation") {
        return <Navigate to="/createVote" replace />;
    }
    else if (step === "Voting") {
        return <Navigate to="/voting" replace />;
    }
    else if (step === "Tallying") {
        return <Navigate to="/tallying" replace />;
    }
    else if (step === "Result") {
        return <Navigate to="/result" replace />;
    }
    else if (step !== "Key Generation") {
        return <p>There's nothing here: 404!</p>
    }
    return children;
}
