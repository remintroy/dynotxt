import "./style.scss";
import { useEffect, useState } from "react";
import Editor from "../../components/Editor";
import { allowBottomNav } from "../../redux/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Card, Container, Flex, Image, Loader, LoadingOverlay, Overlay, ScrollArea, Stack, Text, Textarea } from "@mantine/core";
import { IconEdit, IconEye, IconFile, IconGlobe, IconInfoHexagon } from "@tabler/icons-react";
import { Prism } from "@mantine/prism";
import parse from "html-react-parser";
import ImageUploadButton from "../../components/ImageUploadButton";
import { Link, useParams } from "react-router-dom";
import { blogBackend } from "../../configs/axios";
import { notifications } from "@mantine/notifications";

const CreateBlogPage = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams();
  const accessToken = useAppSelector((state) => state.user.accessToken)

  useEffect(() => {
    dispatch(allowBottomNav(false));
    return () => {
      dispatch(allowBottomNav(true));
    };
  }, []);


  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [bodyValue, setBodyValue] = useState({ content: "", value: {}, hash: "" });
  const [toggelEditor, setToggleEditor] = useState(true);
  const [bannerImg, setBannerImg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const reactBody = parse(bodyValue.content, {
    replace: (domNode: any) => {
      if (domNode.name === "pre" && domNode.children?.[0]?.data) {
        return <Prism language="javascript">{domNode.children?.[0]?.data}</Prism>;
      }
    },
  });

  const getBlogData = async () => {
    try {
      const { data } = await blogBackend.get(`/blog/${blogId}/edit`, { headers: { Authorization: `Bearer ${accessToken}` } });

      if (data?.title) setTitle(data.title)
      if (data?.subtitle) setSubTitle(data.subtitle)
      if (data?.bannerImgURL) setBannerImg(data.bannerImgURL)
      if (data?.body) setBodyValue((pre) => { return { ...pre, value: data.body } })

      setIsLoading(false)

    } catch (error: any) {
      const msg = error.response.data.error ? error.response.data.error : "Careful while submitting there is a chance of data lose";
      notifications.show({
        color: "red",
        title: "Faild to fetch existing data",
        message: msg
      });
      setErrorMessage(msg)
      setIsError(true)
      setIsLoading(false)
      console.log(error)
    }
  }

  const [statusOfSaveChanges, setStatusOfSaveChanges] = useState({ loading: false })

  const uploadCurrentState = async () => {
    try {
      setStatusOfSaveChanges((pre) => { return { ...pre, loading: true } });
      const dataToSend = {
        title,
        subtitle,
        body: bodyValue.value
      }
      const { data } = await blogBackend.put(`/blog/${blogId}`, dataToSend, { headers: { Authorization: `Bearer ${accessToken}` } });
      notifications.show({
        color: "green",
        title: "Blog data saved",
        message: "Your current state is saved. You can safely close the browser window now"
      })
      setStatusOfSaveChanges((pre) => { return { ...pre, loading: false } });
    } catch (error: any) {
      // faild to fetch
      notifications.show({
        color: 'red',
        title: "Faild to fetch existing data",
        message: error.response.data.error ? error.response.data.error : "Careful while submitting there is a chance of data lose"
      })
      setStatusOfSaveChanges((pre) => { return { ...pre, loading: false } });
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogData()
  }, [])

  const [statusOfPublishImage, setStatusOfPublishImage] = useState({ loading: false })

  const publishImage = async () => {
    try {
      setStatusOfPublishImage((pre) => { return { ...pre, loading: true } });
      const { data } = await blogBackend.put(`/blog/${blogId}/publish`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
      console.log(data)
      notifications.show({
        color: 'green',
        title: "Blog published",
        message: "You blog is now public"
      })
      setStatusOfPublishImage((pre) => { return { ...pre, loading: false } });
    } catch (error: any) {
      notifications.show({
        color: 'red',
        title: "Faild to fetch existing data",
        message: error.response.data.error ? error.response.data.error : "Failed to publish blog"
      })
      setStatusOfPublishImage((pre) => { return { ...pre, loading: false } });
    }
  }

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
        {
          isLoading && (<div><LoadingOverlay visible={isLoading} /></div>)
        }
        {
          isError && (
            <div>
              <Overlay blur={15} center sx={{ flexDirection: 'column' }}>
                <>
                  <Flex align={"center"}><IconInfoHexagon /><Text size={"xl"}> &nbsp; Error </Text></Flex><br />
                  <Text>{errorMessage ? errorMessage : "Oops some thing went wrong"}</Text>
                </>
              </Overlay>
            </div>
          )
        }
        {toggelEditor && !isError && !isLoading && (
          <ScrollArea offsetScrollbars h="100%">
            <ImageUploadButton value={bannerImg} setValue={setBannerImg} blogId={blogId} />
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
              value={subtitle}
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
          <div className="innerToSetWidth">
            <Image width="100%" height={300} src={bannerImg} withPlaceholder radius={5} />
            <br />
            <h1>{title}</h1>
            <Text color="dimmed">{subtitle}</Text>
            <br />
            <div className="body">
              {reactBody}
            </div>
          </div>
        )}
      </Card>
      <div className="BottomBtn">
        <Flex align="center" justify="space-between" >
          <Stack spacing={1} sx={{ flexDirection: "row", gap: "10px" }}>
            <Button variant="outline" leftIcon={statusOfPublishImage.loading ? <Loader size={"xs"} /> : <IconGlobe />} onClick={() => publishImage()}>
              {statusOfPublishImage.loading ? "Publishing" : "Publish"}
            </Button>
            <Button variant="subtle" color="dark" leftIcon={statusOfSaveChanges.loading ? <Loader size={"xs"} /> : <IconFile />} onClick={() => uploadCurrentState()}>
              {statusOfSaveChanges.loading ? "Saving changes" : "Save changes"}
            </Button>
          </Stack>
          <Link className="link" to="/">
            <Button variant="outline">Go to home</Button>
          </Link>
        </Flex>
      </div>
    </Container>
  );

};

export default CreateBlogPage;
