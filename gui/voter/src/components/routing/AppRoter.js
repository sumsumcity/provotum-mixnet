import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Login";
import Vote from "../views/Vote";
import Confirmation from "../views/Confirmation";
import ControlSubmition from "../views/ControlSubmition";
import { VoteGuard } from "./routeProtectors/VoteGuard";


const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<VoteGuard><Login/></VoteGuard>} />
          <Route path="/vote" element={<VoteGuard><Vote/></VoteGuard>} />
          <Route path="/confirm" element={<VoteGuard><Confirmation/></VoteGuard>} />
          <Route path="/controlSubmit" element={<VoteGuard><ControlSubmition/></VoteGuard>} />
          <Route path="/" element={<Login/>} />
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;