import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.User);
  console.log(user);
  // const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <div className="body">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
