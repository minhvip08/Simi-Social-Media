import { Route, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import Home from "./pages/HomePage/Home";
import Messages from "./pages/Messages/Messages";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { useEffect } from "react";

function App() {

  const {auth} = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();



  useEffect(() => {
    dispatch(getProfileAction(jwt));
    console.log("App.js",auth);
  },[jwt]);

  if (auth.loading){
    return <h1>Loading...</h1>
  }

  else {
    return (
      <div className="">
        <Routes>
          <Route path="/*" element={auth.user ? <Home />:<Authentication /> } />
          <Route path="/messages" element={<Messages />} />
  
        </Routes>
      </div>
    );
  }
  


}

export default App;
