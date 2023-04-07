import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

export const BASE_URL = "http://localhost:8800";

const Home = () => {
  const cat = useLocation().search;
  const fetchPost = async () => {
    const res = await axios.get(`${BASE_URL}/api/posts`);
    return res.data;
  };

  const {
    data: posts,
    isError,
    isLoading,
  } = useQuery(["get-posts"], fetchPost, {});

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Ooppss an error occured</p>;
  }

  return (
    <div className="">
      <div className="mt-5 flex flex-col gap-28">
        {posts &&
          posts?.map((post) => (
            <div
              className="flex gap-14"
              key={post.id}
              style={{
                flexDirection: post.id % 2 === 1 ? "row-reverse" : "row",
              }}
            >
              <div className="flex-[2] relative">
                <img
                  className="w-full max-h-[400px] object-cover"
                  src={post.img}
                  alt=""
                />
                <div className="w-full h-full bg-teal-400 absolute left-[-20px] top-[20px] z-[-1] "></div>
              </div>

              <div className="content flex flex-col justify-between flex-[3]">
                <Link to={`/post/${post.id}/`}>
                  <h1 className="text-5xl">{post.title}</h1>
                </Link>
                <p className="text-lg">{post.desc}</p>
                <button
                  className="bg-white px-5 py-2 cursor-pointer border border-solid border-teal-500 text-teal-500 hover:border hover:border-solid hover:bg-teal-500 hover:text-black"
                  style={{ width: "max-content" }}
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
