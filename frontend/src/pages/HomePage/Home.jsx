import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import MiddlePath from "../../components/MiddlePath/MiddlePath";
import Reels from "../../components/Reels/Reels";
import CreateReelsFrom from "../../components/Reels/CreateReelsFrom";
import Profile from "../../pages/Profile/Profile";
import HomeRight from "../../components/HomeRight/HomeRight";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector(store=>store);

  // useEffect(() => {
  //   dispatch(getProfileAction(jwt));
  // }, []);


  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid
          item
          className="px-5 flex justify-center"
          xs={12}
          lg={location.pathname === "/" ? 6 :9}
        >
            <Routes>
                <Route path="/" element={<MiddlePath />} />
                <Route path='/reels' element={<Reels />} />
                <Route path='/create-reels' element={<CreateReelsFrom />} />
                <Route path='/profile/:id' element={<Profile />} />

            </Routes>
        </Grid>
{location.pathname==='/' &&        <Grid item lg={3} className="relative">
          <div className="sticky top-0 w-full">
            <HomeRight />
          </div>

        </Grid>}
      </Grid>
    </div>
  );
};

export default Home;
