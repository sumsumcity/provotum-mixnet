import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import CreateVote from "../views/CreateVote";
import KeyGeneration from "../views/KeyGeneration";
import Voting from "../views/Voting";
import Tallying from "../views/Tallying";
import Result from "../views/Result";
import { VotingGuard } from "./routeProtectors/VotingGuard";
import { KeyGenGuard } from "./routeProtectors/KeyGenGuard";
import { ResultGuard } from "./routeProtectors/ResultGuard";
import { TallyingGuard } from "./routeProtectors/TallyingGuard";
import { VoteCreationGuard } from "./routeProtectors/VoteCreationGuard";


const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/voting" />} />
          <Route path="/createVote" element={<VoteCreationGuard><CreateVote/></VoteCreationGuard>} />
          <Route path="/keyGen" element={<KeyGenGuard><KeyGeneration /></KeyGenGuard>} />
          <Route path="/voting" element={<VotingGuard><Voting /></VotingGuard>} /> 
          <Route path="/tallying" element={<TallyingGuard><Tallying/></TallyingGuard>} />
          <Route path="/result" element={<ResultGuard><Result/></ResultGuard>} />
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;