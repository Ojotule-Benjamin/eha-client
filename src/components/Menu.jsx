import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../pages/Home";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/posts?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="flex flex-col gap-6 flex-[2]">
      <h1 className="text-xl" style={{ color: "#555" }}>
        Other posts you may like
      </h1>
      {posts.map((post) => (
        <div className="flex flex-col gap-3" key={post.id}>
          <img className="w-full h-52 object-cover" src={post.img} alt="" />
          <h2 className="text-xl" style={{ color: "#555" }}>
            {post.title}
          </h2>
          <button
            className="bg-white px-2 py-2 cursor-pointer border border-solid border-teal-500 text-teal-500 hover:border hover:border-solid hover:bg-teal-500 hover:text-black"
            style={{ width: "max-content" }}
          >
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
