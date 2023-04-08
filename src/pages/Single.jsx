import React, { useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation, useNavigation } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigation();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.warn(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-14">
      <div className=" flex flex-col gap-7 flex-[5] ">
        <img className="w-full h-72 object-cover" src={post?.img} alt="" />

        <div className="flex items-center  gap-3 text-sm">
          {post.userImg && (
            <img
              className="w-14 h-14 rounded-full object-cover"
              src={post.userImg}
              alt=""
            />
          )}

          <div className="info">
            <span className="font-bold">{post?.username}</span>
            <div className="flex items-center justify-center gap-4">
              <p>Posted {moment(post.date).fromNow()}</p>
              {currentUser?.username === post?.username && (
                <div className=" flex gap-1 px">
                  <div className="bg-teal-300 text-[10px] rounded-full w-7 h-7 flex item-center justify-center text-black-500">
                    <Link to={`/write?edit=2`} state={post}>
                      <EditIcon />
                    </Link>
                  </div>
                  <div
                    onClick={handleDelete}
                    className="bg-red-300 text-sm rounded-full w-7 h-7 flex item-center justify-center text-gray-500"
                  >
                    <Link>
                      <DeleteIcon />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-black-500">{post?.title}</h1>
        {post?.desc}
        {/* <p className="text-justify text-base leading-30">
        </p> */}
      </div>

      <Menu cat={post?.cat} />
    </div>
  );
};

export default Single;
