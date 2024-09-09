import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Navigation, Search } from "./index";
import { Intro, Contact, Footer } from "../../components";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);
  return (
    <div className="w-full flex gap-6 flex-col items-center h-full boder-red-500">
      <Header />
      <Navigation />
      {isLoggedIn && <Search />}
      <div className="w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3">
        <Outlet />
      </div>
      <Intro />
      <Contact />
      <Footer />
      <div className="h-[500px]"></div>
    </div>
  );
};
export default Home;
