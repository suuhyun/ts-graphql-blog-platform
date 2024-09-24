import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { CREATE_USER } from "../graphql/mutations/authMutaions";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import FormInput from "../components/FormInput";
import { useSignup } from "../hooks/auth/useSignup";

type Props = {};

const SignupPage = (props: Props) => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showModal, setShowModal] = useState(false);

  const { signup, loading, error } = useSignup({
    onCompleted: () => {
      setShowModal(true);
    },
    onError: (err) => {
      console.error("Signup error:", err);
      setErrorMsg(err.message);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      setErrorMsg("Passwords do not match");
      return;
    }
    const { passwordConfirm, ...rest } = formData;
    signup(rest);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  const inputs = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Username", name: "username" },
    { label: "Email", name: "email" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "passwordConfirm", type: "password" },
  ];
  return (
    <div className="relative w-100 flex justify-center">
      <form onSubmit={handleSignup}>
        {inputs.map((input) => (
          <FormInput
            key={input.name}
            handleChange={handleChange}
            label={input.label}
            name={input.name}
            type={input.type || "text"}
          />
        ))}
        <button type="submit" className="p-2 bg-slate-200 rounded">
          Sign Up
        </button>
      </form>
      <div className="text-red-500">{errorMsg}</div>
      {showModal && (
        <Modal
          content="User created successfully"
          button="Close"
          onClose={handleModalClose}
        />
      )}
      {loading && <Spinner />}
    </div>
  );
};

export default SignupPage;
