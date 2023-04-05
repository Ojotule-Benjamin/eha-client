import React from "react";
import blogLogo from "../img/blogLogo.png";

const Footer = () => {
  return (
    <footer className="mt-10 p-5 flex items-center justify-between text-sm bg-teal-300 ">
      <img src={blogLogo} alt="" className="w-24 h-24" />
      <span className="">
        Made with ❤️ <b>React.js</b>
      </span>
    </footer>
  );
};

export default Footer;
