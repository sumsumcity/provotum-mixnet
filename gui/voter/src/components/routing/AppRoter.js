import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Vote from "../views/Vote";
import Confirmation from "../views/Confirmation";
import ControlSubmition from "../views/ControlSubmition";
import { VoteGuard } from "./routeProtectors/VoteGuard";
import { UserGuard } from "./routeProtectors/UserGuard";
import { LoginGuard } from "./routeProtectors/LoginGuard";



const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginGuard><Login/></LoginGuard>} />
          <Route path="/home" element={<UserGuard><Home/></UserGuard>} />
          <Route path="/vote" element={<VoteGuard><UserGuard><Vote/></UserGuard></VoteGuard>} />
          <Route path="/confirm" element={<VoteGuard><UserGuard><Confirmation/></UserGuard></VoteGuard>} />
          <Route path="/controlSubmit" element={<VoteGuard><UserGuard><ControlSubmition/></UserGuard></VoteGuard>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;