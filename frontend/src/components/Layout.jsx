import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <div
        className={
          isHomePage ? "page-container" : "page-container content-container"
        }
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
