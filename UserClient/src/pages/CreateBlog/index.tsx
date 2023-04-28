import "./style.scss";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import { allowBottomNav } from "../../redux/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Card, Container, ScrollArea, Stack, Text, Textarea } from "@mantine/core";
import { IconCamera, IconEdit, IconEye, IconFile, IconGlobe } from "@tabler/icons-react";
import { Prism } from "@mantine/prism";
import ImageUploadButton from "../../components/ImageUploadButton";

const CreateBlogPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(allowBottomNav(false));
    return () => {
      dispatch(allowBottomNav(true));
    };
  }, []);

  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  const [title, setTitle] = useState("");
  const [subtle, setSubTitle] = useState("");
  const [bodyValue, setBodyValue] = useState({ content: "", value: {}, hash: "" });
  const [toggelEditor, setToggleEditor] = useState(true);
  const [bannerImg, setBannerImg] = useState("");

  return (
    <Container className={`CreateBlog ${thisIsPc ? "" : "mb"}`}>
      <div className="titleBar">
        <div>
          <h2>Dynotxt</h2>
        </div>
        <div className="buttons">
          <Stack spacing={1} sx={{ mb: 1, flexDirection: "row", gap: "10px" }}>
            <Button leftIcon={<IconEdit />} onClick={() => setToggleEditor(true)} variant="outline">
              Edit
            </Button>
            <Button leftIcon={<IconEye />} onClick={() => setToggleEditor(false)} variant="outline">
              Preview
            </Button>
          </Stack>
        </div>
      </div>
      <Card withBorder className="inputsContainer">
        {toggelEditor && (
          <ScrollArea offsetScrollbars h="100%">
            <ImageUploadButton value={bannerImg} setValue={bannerImg} />
            <br />
            <br />
            <Textarea
              className="titleInput"
              placeholder="You Story Title Here..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autosize
              sx={{ textarea: { fontSize: "2.3rem", fontWeight: "bold" } }}
            ></Textarea>
            <Textarea
              className="titleInput"
              placeholder="Subtitle here"
              autosize
              value={subtle}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => setSubTitle(e.target.value)}
              sx={{ textarea: { fontSize: "1.3rem", fontWeight: "bold" } }}
            ></Textarea>
            <br />
            <Editor value={bodyValue} setValue={setBodyValue} />
          </ScrollArea>
        )}

        {!toggelEditor && (
          <ScrollArea offsetScrollbars h="100%">
            <h1>{title}</h1>
            <Text color="dimmed">{subtle}</Text>
            <br />
            {/* <Prism language="javascript">
              {`const vi = "hi"`}
            </Prism> */}
            <div dangerouslySetInnerHTML={{ __html: bodyValue.content }}></div>
          </ScrollArea>
        )}
      </Card>
      <Stack className="BottomBtn" spacing={1} sx={{ marginBottom: 15, flexDirection: "row", gap: "10px" }}>
        <Button variant="outline" leftIcon={<IconGlobe />}>
          Publish
        </Button>
        <Button variant="subtle" color="dark" leftIcon={<IconFile />}>
          Save as draft
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateBlogPage;
