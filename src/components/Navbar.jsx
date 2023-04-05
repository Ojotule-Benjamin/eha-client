import React, { useContext } from "react";
import { Link } from "react-router-dom";
import blogLogo from "../img/blogLogo.png";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext); // get the login function from context

  return (
    <div className="navbar">
      <div className="py-3 px-0 flex justify-between">
        <div className="logo">
          <Link to="/">
            <img src={blogLogo} alt="" className="w-28 h-28" />
          </Link>
        </div>
        <div className="flex items-center flex-row gap-3">
          <Link to="/?cat=art" className="text-decoration-none text-inherit ">
            <h6 className="text-teal-800 text-sm font-bold">ART</h6>
          </Link>
          <Link
            to="/?cat=science"
            className="text-decoration-none text-inherit "
          >
            <h6 className="text-teal-800 text-sm font-bold">SCIENCE</h6>
          </Link>
          <Link
            to="/?cat=technology"
            className="text-decoration-none text-inherit "
          >
            <h6 className="text-teal-800 text-sm font-bold">TECHNOLOGY</h6>
          </Link>
          <Link
            to="/?cat=cinema"
            className="text-decoration-none text-inherit "
          >
            <h6 className="text-teal-800 text-sm font-bold">CINEMA</h6>
          </Link>
          <Link
            to="/?cat=design"
            className="text-decoration-none text-inherit "
          >
            <h6 className="text-teal-800 text-sm font-bold">DESIGN</h6>
          </Link>
          <Link to="/?cat=food" className="text-decoration-none text-inherit ">
            <h6 className="text-teal-800 text-sm font-bold">FOOD</h6>
          </Link>
          <span className="cursor-pointer text-sm font-light text-teal-800">
            {currentUser?.username}
          </span>
          {currentUser ? (
            <span
              onClick={logout}
              className="cursor-pointer text-sm font-light text-teal-800"
            >
              Logout
            </span>
          ) : (
            <Link
              className="cursor-pointer text-sm font-light text-teal-800"
              to="/login"
            >
              Login
            </Link>
          )}
          <span className="bg-teal-300 w-14 h-14 flex items-center justify-center rounded-full  hover:bg-white hover:text-teal-500 hover:border-2 border-solid border-teal-500">
            <Link
              className=" text-teal-800 text-lg font-light  hover:text-teal-500"
              to="/write"
            >
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
