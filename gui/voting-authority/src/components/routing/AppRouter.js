import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import CreateVote from "../views/CreateVote";
import KeyGeneration from "../views/KeyGeneration";
import Voting from "../views/Voting";
import Tallying from "../views/Tallying";
import Result from "../views/Result";
import { VotingGuard } from "./routeProtectors/VotingGuard";


const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateVote/>} />
          <Route path="/keyGen" element={<KeyGeneration/>} />
          <Route path="/voting" element={<VotingGuard><Voting /></VotingGuard>} /> 
          <Route path="/tallying" element={<Tallying/>} />
          <Route path="/result" element={<Result/>} />
          <Route path="*" element={<p>There's nothing here: 404!</p>}/>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;