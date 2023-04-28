import { useEffect, useState } from "react";
import "./style.scss";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.bubble.css"; // import the styles
import "react-quill/dist/quill.snow.css"; // import the styles
import { Button, Container, IconButton, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { allowBottomNav } from "../../redux/navBarSlice";
import { SHA256 } from "crypto-js";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PublicIcon from "@mui/icons-material/Public";
import SaveAsIcon from "@mui/icons-material/SaveAs";

const Editor = ({ value, setValue }: { value: any; setValue: any }) => {
  const [editorContent, setEditorContent] = useState(value ? value : "");

  const handleEditorChange = (content: any, delta: any, source: any, editor: any) => {
    setEditorContent(editor.getContents());
    const hash = SHA256(JSON.stringify(editorContent)).toString();
    console.log(hash);
    setValue(content, delta, hash);
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

const BlockInput = ({ setList, index, remove }: { setList: any; index: number; remove: any }) => {
  const [state, setState] = useState({
    isFocused: true,
    value: "",
    delta: "",
    hash: "",
    hover: false,
  });

  const handleSetState = () => {
    setState((pre) => {
      return {
        ...pre,
        isFocused: false,
      };
    });
  };

  const setValue = (value: any, delta: any, hash: string) => {
    setState((pre) => {
      return {
        ...pre,
        value: value,
        delta: delta,
        hash: hash,
      };
    });
  };

  const focus = () => {
    setState((pre) => {
      return {
        ...pre,
        isFocused: true,
      };
    });
  };

  return (
    <div
      className={`block-input ${state.isFocused || state.hover ? "b" : ""}`}
      onMouseOver={() => {
        setState((pre) => {
          return {
            ...pre,
            hover: true,
          };
        });
      }}
      onMouseOut={() => {
        setState((pre) => {
          return {
            ...pre,
            hover: false,
          };
        });
      }}
    >
      <div className={`leftIcons ${state.isFocused || state.hover ? "show" : "hide"}`}>
        <IconButton
          onClick={() => {
            remove(index);
          }}
        >
          <DeleteIcon />
        </IconButton>
        {state.isFocused && (
          <IconButton onClick={handleSetState}>
            <DoneIcon />
          </IconButton>
        )}
        {!state.isFocused && (
          <IconButton onClick={focus}>
            <EditIcon />
          </IconButton>
        )}
        <IconButton
          onClick={() => {
            setList((arr: any) => [...arr, ...[Math.random() * 1000]]);
          }}
        >
          <AddIcon />
        </IconButton>
      </div>
      {state.isFocused && (
        <div className="inputCont">
          <Editor value={state.value} setValue={setValue} />
        </div>
      )}
      {!state.isFocused && (
        <>
          <div dangerouslySetInnerHTML={{ __html: state.value }} />
        </>
      )}
    </div>
  );
};

const CreateBlog = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allowBottomNav(false));
    return () => {
      dispatch(allowBottomNav(true));
    };
  }, []);

  const [value, setValue] = useState("");
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);

  return (
    <Container className={`CreateBlog ${thisIsPc ? "" : "mb"}`} maxWidth="md">
      <div className="titleBar">
        <div>
          <h2>Dynotxt</h2>
        </div>
        <div className="buttons">
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Button variant="outlined">Edit</Button>
            <Button variant="outlined">Preview</Button>
          </Stack>
        </div>
      </div>
      <div className="inputsContainer">
        <Button variant="outlined" startIcon={<CameraAltIcon />}>
          Choose Cover photo
        </Button>
        <br />
        <br />
        <TextareaAutosize
          className="titleInput"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          minRows={1}
          placeholder="You Story Title Here..."
          style={{ fontSize: "2.3rem", fontWeight: "bold" }}
        ></TextareaAutosize>
        <TextareaAutosize
          className="titleInput"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          minRows={1}
          placeholder="Subtitle here"
          style={{ fontSize: "1.3rem" }}
        ></TextareaAutosize>
        <br />
        <Editor value={value} setValue={setValue} />
      </div>
      <Stack className="BottomBtn" direction="row" spacing={1} sx={{ mb: 1 }} marginTop={3}>
        <Button variant="outlined" startIcon={<PublicIcon />} size="large">
          Publish
        </Button>
        <Button startIcon={<SaveAsIcon />}>Save as draft</Button>
      </Stack>
    </Container>
  );
};

export default CreateBlog;
