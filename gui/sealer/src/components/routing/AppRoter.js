import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from "../views/Test";

const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test/>} />
          <Route path="/" element={<Test/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;