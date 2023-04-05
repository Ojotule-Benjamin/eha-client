import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <img
      key={file.name}
      src={file.preview}
      alt="images"
      className="w-full h-80 object-contain mt-2 bg-teal-500"
    />
  ));

  return (
    <>
      <div
        className="flex w-full h-full items-center justify-center flex-col 
         bg-gray-100 border p-3"
        {...getRootProps()}
        style={{
          cursor: "pointer",
          border: isDragActive ? "2px dashed #6c63ff" : "2px dashed #ccc",
          borderRadius: "5px",
        }}
      >
        <input {...getInputProps()} />
        <p className="text-xl font-light text-gray-400">Drag and drop here</p>
        <div>{images}</div>
      </div>
    </>
  );
};

export default FileUpload;
