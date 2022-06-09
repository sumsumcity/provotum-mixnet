import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateVote from "../views/CreateVote";

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/createVote" element={<CreateVote/>} />
          <Route path="/" element={<CreateVote/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;