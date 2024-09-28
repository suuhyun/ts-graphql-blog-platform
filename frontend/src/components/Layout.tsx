import { useMutation } from "@apollo/client";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LOGOUT } from "../graphql/mutations/authMutaions";
import { useAuthStore } from "../stores/authStore";
import logo from "../assets/blog-logo.png";

type Props = {};

const Layout = (props: Props) => {
  const { logoutUser } = useAuthStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [logout, { loading, error }] = useMutation(LOGOUT, {
    onCompleted: () => {
      console.log("Logged out");
      logoutUser();
      navigate("/");
    },
    onError: (err) => {
      console.error("Logout error:", err);
    },
  });
  return (
    <>
      <div className="flex gap-5 m-5 items-center">
        <Link to="/" className="">
          <img className="h-8 w-15" src={logo} alt="" />
        </Link>
        {isAuthenticated ? (
          <button onClick={() => logout()}>Log out</button>
        ) : (
          <>
            <Link to="/login" className="">
              Login
            </Link>

            <Link to="/signup" className="">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/profile" className="">
          Profile
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
