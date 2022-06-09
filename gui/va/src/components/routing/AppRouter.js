import {BrowserRouter, Route, Routes} from "react-router-dom";
import CombineKey from "../views/CombineKey";
import CreateVote from "../views/CreateVote";

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/createVote" element={<CreateVote/>} />
          <Route path="/combineKey" element={<CombineKey/>} />
          <Route path="/" element={<CreateVote/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;