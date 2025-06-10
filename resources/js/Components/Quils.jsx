import React from "react";
import ReactQuill from "react-quill";

export default function Quils({ ...props }) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],

            [{ align: [] }],

            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "color",
        "background",
        "script",
        "list",
        "bullet",
        "indent",

        "align",
        "clean",
    ];
    return (
        <>
            <ReactQuill
                {...props}
                modules={modules}
                formats={formats}
                theme="snow"
            />
        </>
    );
}
