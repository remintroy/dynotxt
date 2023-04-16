import { useState } from "react";
import "./style.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the styles
import { Container } from "@mui/material";

const Editor = () => {
  const [editorContent, setEditorContent] = useState("");
  return (
    <div className="Editor">
      <ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        modules={{
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: ["red"] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],

            ["clean"], // remove formatting button
          ],
        }}
      />
    </div>
  );
};

const CreateBlog = () => {
  return (
    <Container className="CreateBlog">
      <Editor />
    </Container>
  );
};

export default CreateBlog;
