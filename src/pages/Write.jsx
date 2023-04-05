import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import FileUpload from "../components/FileUpload";
import axios from "axios";

const Write = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [files, setFiles] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      //console.log(acceptedFiles);
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = (readerEvt) => {
          // Do whatever you want with the file contents
          const image = reader.result;
          console.log(image);
        };
        reader.readAsDataURL(file);
      });
    },
  });

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.replace(/^data:image\/\w+;base64,/, "");
      try {
        axios.post("/api/uploadImage", { image: base64 }).then((res) => {
          setImgUrl(res.data);
          console.log(res.data);
          //console.log("Image uploaded successfully");
        });
      } catch (err) {
        console.log(err);
      }
    };
    reader.readAsDataURL(file);
  };

  const images = files.map((file) => (
    <img
      key={file.name}
      src={imgUrl}
      alt="images"
      className="w-full h-full object-contain"
    />
  ));

  return (
    <div className="flex flex-col">
      <div className="write mt-5 flex gap-5">
        {/* text editor */}
        <div className="content flex flex-col gap-5 flex-[5]">
          <input
            className="p-2 border outline-none border-gray-400 border-solid"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer h-80 overflow-scroll border border-gray-400 border-solid">
            <ReactQuill
              className="h-full border-none"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>

        {/* Publish & category field */}
        <div className=" flex-[2] flex flex-col gap-5">
          <div className="item flex text-xs text-gray-600 flex-col justify-between  flex-1 p-3 border border-gray-400 border-solid">
            <h1 className="font-extrabold">Publish</h1>
            <span>
              <b>Status: </b>Draft
            </span>
            <span>
              <b>Visibility: </b>Public
            </span>
            <input style={{ display: "none" }} type="file" name="" id="file" />
            <label className="underline cursor-pointer " htmlFor="file">
              Upload Image
            </label>
            <div className="buttons flex justify-between">
              <button className="px-[3px] py-1 bg-white text-teal-400 border border-teal-400 border-solid">
                Save as draft
              </button>
              <button
                onClick={handleClick}
                className="px-[3px] py-1 bg-teal-400 text-white  border border-teal-400 border-solid"
              >
                Publish
              </button>
            </div>
          </div>

          <div className="item flex flex-col text-gray-600 text-xs justify-between flex-1 p-3 border border-gray-400 border-solid">
            <h1 className="category font-extrabold">Category</h1>
            <div className="cat flex items-center gap-[2px] text-teal-400">
              <input
                type="radio"
                name="cat"
                value="art"
                id="art"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat  flex items-center gap-[2px] text-teal-400">
              <input
                type="radio"
                name="cat"
                value="science"
                id="science"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Science</label>
            </div>
            <div className="cat  flex items-center gap-[2px] text-teal-400">
              <input
                type="radio"
                name="cat"
                value="technology"
                id="technology"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Technology</label>
            </div>
            <div className="cat  flex items-center gap-[2px] text-teal-400">
              <input
                type="radio"
                name="cat"
                value="cinema"
                id="cinema"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Cinema</label>
            </div>
            <div className="cat  flex items-center gap-[2px] text-teal-400">
              <input
                type="radio"
                name="cat"
                value="design"
                id="design"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Design</label>
            </div>
            <div className="cat  flex items-center gap-[2px] text-teal-400">
              <input
                type="radio"
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Food</label>
            </div>
          </div>
        </div>
      </div>

      {/* drop-zone */}
      <div className="flex flex-col items-center justify-center mt-5 h-[500px] bg-gray-100 ">
        <div
          className="flex w-full h-full items-center justify-center flex-col 
         bg-gray-100 border p-3"
          {...getRootProps()}
          style={{
            cursor: "pointer",
            border: isDragActive ? "2px dashed #6c63ff" : "2px dashed #ccc",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <input onChange={uploadImage} {...getInputProps()} />
          <p className="text-xl font-light text-gray-400">Drag and drop here</p>
          <div className="w-full h-full absolute left-0 right-0 flex items-center justify-center">
            {images}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;