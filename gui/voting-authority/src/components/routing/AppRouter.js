import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateVote from "../views/CreateVote";
import KeyGeneration from "../views/KeyGeneration";

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateVote/>} />
          <Route path="/keyGen" element={<KeyGeneration/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;