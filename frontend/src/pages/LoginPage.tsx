import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useLogin } from "../hooks/auth/useLogin";
import { useAuthStore } from "../stores/authStore";

type Props = {};

const LoginPage = (props: Props) => {
  const { setCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const from = location.state?.from?.pathname || "/";
  const { loginUser, loading, error } = useLogin({
    onCompleted: (data) => {
      setCurrentUser(data.login);
      navigate(from, { replace: true });
    },
    onError: (err) => {
      console.error("Login error:", err);
      setErrorMsg(err.message);
    },
  });
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    loginUser(formData);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="w-100 flex justify-center">
      <form onSubmit={handleLogin}>
        <FormInput label="email" name="email" handleChange={handleChange} />
        <FormInput
          label="Password"
          name="password"
          handleChange={handleChange}
          type="password"
        />
        <button type="submit" className="p-2 bg-slate-200 rounded">
          Sign In
        </button>
      </form>
      {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      {loading && <Spinner />}
    </div>
  );
};

export default LoginPage;
