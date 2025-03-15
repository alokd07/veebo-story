import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      style={{ height: "200px", marginBottom: "80px" }}
      modules={{
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link"],
          ["clean"],
        ],
      }}
    />
  );
}
