import React from "react";
import { Link, Outlet } from "react-router-dom";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <div className="flex gap-5 m-5">
        <Link to="/" className="">Home</Link>
        <Link to="/login" className="">Login</Link>
        <Link to="/signup" className="">Sign Up</Link>
        <Link to="/profile" className="">Profile</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
