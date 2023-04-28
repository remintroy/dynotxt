import "./style.scss";
import { useState } from "react";
import { SHA256 } from "crypto-js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css"; // import the styles
import "react-quill/dist/quill.snow.css"; // import the styles

const Editor = ({ value, setValue }: { value: any; setValue: any }) => {
  const [editorContent, setEditorContent] = useState(value ? value.value : "");

  const handleEditorChange = (content: any, delta: any, source: any, editor: any) => {
    const fulValueOfEditor = editor.getContents();
    setEditorContent(fulValueOfEditor);
    const hash = SHA256(JSON.stringify(editorContent.content)).toString();
    // console.log(hash);
    setValue({ content, value: fulValueOfEditor, hash });
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }, "blockquote"],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ["code-block", "link", "image"],
    ],
  };

  return (
    <div className="Editor">
      <ReactQuill
        value={editorContent}
        onChange={handleEditorChange}
        theme="snow"
        placeholder="Start typing your blog HERE..."
        modules={modules}
      />
    </div>
  );
};

export default Editor;
