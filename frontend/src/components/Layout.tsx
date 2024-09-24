import { useMutation } from "@apollo/client";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGOUT } from "../graphql/mutations/authMutaions";

type Props = {};

const Layout = (props: Props) => {
  const navigate = useNavigate();
  const [logout, { loading, error }] = useMutation(LOGOUT, {
    onCompleted: () => {
      console.log("Logged out");
      navigate("/");
    },
    onError: (err) => {
      console.error("Logout error:", err);
    },
  });
  return (
    <>
      <div className="flex gap-5 m-5">
        <Link to="/" className="">
          Home
        </Link>
        <Link to="/login" className="">
          Login
        </Link>
        <button onClick={() => logout()}>Log out</button>
        <Link to="/signup" className="">
          Sign Up
        </Link>
        <Link to="/profile" className="">
          Profile
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
