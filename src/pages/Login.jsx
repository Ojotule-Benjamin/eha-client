import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../context/authContext";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get the login function from context

  // console.log(currentUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data); // call the login function from context
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-green-100">
      <h1 className="text-xl text-teal-800 font-bold mb-5">Login</h1>

      <form
        className="flex justify-around flex-col p-8 bg-white w-1/2 h-1/2  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <input
            className="text-xs border-b-2 border-gray-200 border-solid outline-none m-1"
            type="text"
            placeholder="Username"
            name="username"
            {...register("username")}
          />
          <span className="text-red-600 text-xs font-light py-1">
            {errors.username?.message}
          </span>
        </div>

        <div className="flex flex-col mb-5">
          <input
            className="text-xs border-b-2 border-gray-200 border-solid outline-none"
            type="password"
            placeholder="Password"
            name="password"
            {...register("password")}
          />
          <span className="text-red-600 text-xs font-light py-1">
            {errors.password?.message}
          </span>
        </div>

        <button className="p-2 border-none bg-teal-800 text-white">
          Login
        </button>
        <p className="text-xs text-center text-red-600">There is an error!</p>
        <span className="text-xs text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-teal-800">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
