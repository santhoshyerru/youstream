import React from "react";
import SideBar from "./SideBar";
import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const isDark = useSelector((store) => store.app.isDarkMode);
  return (
    <div
      className={
        "flex relative " + (isDark ? "dark bg-slate-900 text-white" : "")
      }
    >
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Body;
