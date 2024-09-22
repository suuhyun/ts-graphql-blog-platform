import React from "react";
import { Link, Outlet } from "react-router-dom";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <div className="flex gap-5 m-5">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
