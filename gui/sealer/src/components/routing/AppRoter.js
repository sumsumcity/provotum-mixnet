import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from "../views/Test";
import KeyGeneration from "../views/KeyGeneration";


const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test/>} />
          <Route path="/keyGen" element={<KeyGeneration />} />
          <Route path="/" element={<Test/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default AppRouter;