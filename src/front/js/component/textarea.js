import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css"; // import styles
import Quill from "quill";

const QuillEditor = ({ initialContent, handleTextChange }) => {
  const quillRef = useRef(); // Create a ref for storing the Quill instance
  const quillInstance = useRef(null); // Create a ref for storing the Quill instance

  useEffect(() => {
    if (!quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: { toolbar: true },
      });

      quillInstance.current.on("text-change", function () {
        handleTextChange(quillInstance.current.root.innerHTML);
      });
    }

    if (initialContent) {
      quillInstance.current.clipboard.dangerouslyPasteHTML(initialContent);
    }
  }, [initialContent, handleTextChange]);

  return <div ref={quillRef} />;
};

export default QuillEditor;
