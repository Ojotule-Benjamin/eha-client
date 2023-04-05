import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useMutation } from "react-query";

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    email: yup.string().required().email("Email is required"),
    password: yup.string().required(),
    // age: yup.number().positive().integer().required(),
  })
  .required();

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const registerMutation = useMutation((data) =>
    axios.post("/auth/register", data)
  );

  const onSubmit = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      navigate("/login");
    } catch (e) {}
  };

  // const onSubmit = async (data) => {
  //   try {
  //     await axios.post("/auth/register", data);
  //     navigate("/login");
  //   } catch (e) {}
  // };

  return (
    <div className="flex items-center justify-center flex-col h-screen bg-green-100">
      <h1 className="text-xl text-teal-800 font-bold mb-5">Register</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-around flex-col p-8 bg-white w-1/2 h-1/2 "
      >
        <div className="flex flex-col">
          <input
            className="text-xs border-b-2 border-gray-200 border-solid outline-none"
            type="text"
            name="username"
            placeholder="Username"
            {...register("username")}
          />
          <span className="text-red-600 text-xs font-light py-1">
            {errors.username?.message}
          </span>
        </div>

        <div className="flex flex-col">
          <input
            className=" text-xs border-b-2 border-gray-200 border-solid outline-none"
            type="email"
            name="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <span className="text-red-600 text-xs font-light py-1">
            {errors.email?.message}
          </span>
        </div>

        <div className="flex flex-col ">
          <input
            className="text-xs border-b-2 border-gray-200 border-solid outline-none"
            type="password"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
          <span className="text-red-600 text-xs font-light py-1">
            {errors.email?.message}
          </span>
        </div>

        <button
          className={`p-2 border-none ${
            registerMutation.isLoading ? "bg-gray-300" : "bg-teal-800"
          } text-white`}
          //className="p-2 border-none bg-teal-800 text-white"
        >
          {/* Register */}
          {registerMutation.isLoading ? "Registering..." : "Register"}
        </button>

        <span className="text-xs text-center">
          Do you have an account?{" "}
          <Link to="/login" className="text-teal-800">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
