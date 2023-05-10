import "./style.scss";
import { useEffect, useState } from "react";
import Editor from "../../../components/blog/editor";
import { allowBottomNav } from "../../../lib/redux/navBarSlice";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import {
  Button,
  Card,
  Container,
  Flex,
  Image,
  Loader,
  LoadingOverlay,
  Overlay,
  ScrollArea,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { IconEdit, IconEye, IconFile, IconGlobe, IconInfoHexagon } from "@tabler/icons-react";
import { Prism } from "@mantine/prism";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import ImageUploadButtonComponent from "../../../components/blog/imageUploadButton";
import { useGetBlogQuery, usePutCurrentStateMutation, usePutPublishBlogMutation } from "../../../lib/api/blogApi";

const EditBlogPage = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [bodyValue, setBodyValue] = useState({ content: "", value: {}, hash: "" });
  const [toggelEditor, setToggleEditor] = useState(true);
  const [bannerImg, setBannerImg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingForBlogData, setLoadingForBlogData] = useState(true);
  const [loadingForSaveChanges, setLoadingForSaveChanges] = useState(false);
  const [loadingForPublish, setLoadingForPublish] = useState(false);
  const user = useAppSelector((state) => state.user.data);
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  const dispatch = useAppDispatch();
  const [putCurrentState] = usePutCurrentStateMutation();
  const [putPublishBlog] = usePutPublishBlogMutation();

  const { id: blogId } = useParams();
  const {
    data: blogData,
    isLoading: isBlogDataLoading,
    isFetching: isBlogDataFetching,
    isError: isBlogDataError,
  } = useGetBlogQuery({ blogId }, { skip: !user });

  // convert html to react components and inject Prism component
  const reactBody = parse(bodyValue.content, {
    replace: (domNode: any) => {
      if (domNode.name === "pre" && domNode.children?.[0]?.data) {
        return <Prism language="javascript">{domNode.children?.[0]?.data}</Prism>;
      }
    },
  });

  useEffect(() => {
    // load all data to currespinding states if exist
    if (blogData?.title) setTitle(blogData.title);
    if (blogData?.subtitle) setSubTitle(blogData.subtitle);
    if (blogData?.bannerImgURL) setBannerImg(blogData.bannerImgURL);
    if (blogData?.body) setBodyValue((pre) => ({ ...pre, value: blogData.body }));

    // set loading state with response loading and fetching state from rtk query
    setLoadingForBlogData((isBlogDataFetching || isBlogDataLoading) == true);
    //...
  }, [blogData, isBlogDataFetching, isBlogDataLoading]);

  // uploading current state to server
  const uploadCurrentState = async () => {
    setLoadingForSaveChanges(true);
    try {
      const dataToSend = {
        title,
        subtitle,
        body: bodyValue.value,
      };
      await putCurrentState({ blogId, data: dataToSend }).unwrap();
      notifications.show({
        color: "green",
        title: "Blog data saved",
        message: "Your current state is saved. You can safely close the browser window now",
      });
      setLoadingForSaveChanges(false);
      //...
    } catch (error: any) {
      // error handling
      notifications.show({
        color: "red",
        title: "Faild to fetch existing data",
        message: error?.data?.error ?? "Careful while submitting there is a chance of data lose",
      });
      setLoadingForSaveChanges(false);
    }
  };

  const publishBlog = async () => {
    setLoadingForPublish(true);
    try {
      await putPublishBlog(blogId).unwrap();
      notifications.show({
        color: "green",
        title: "Blog published",
        message: "You blog is now public",
      });
      setLoadingForPublish(false);
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: "Faild to fetch existing data",
        message: error?.data?.error ?? "Failed to publish blog",
      });
      setLoadingForPublish(false);
    }
  };

  useEffect(() => {
    dispatch(allowBottomNav(false));
    return () => {
      dispatch(allowBottomNav(true));
    };
  }, []);

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
        {loadingForBlogData && <div>{<LoadingOverlay visible={loadingForBlogData} />}</div>}
        {isBlogDataError && (
          <div>
            <Overlay blur={15} center sx={{ flexDirection: "column" }}>
              <>
                <Flex align={"center"}>
                  <IconInfoHexagon />
                  <Text size={"xl"}> &nbsp; Error </Text>
                </Flex>
                <br />
                <Text>{errorMessage ?? "Oops some thing went wrong"}</Text>
              </>
            </Overlay>
          </div>
        )}
        {toggelEditor && !isBlogDataError && !loadingForBlogData && (
          <ScrollArea offsetScrollbars h="100%">
            <ImageUploadButtonComponent value={bannerImg} setValue={setBannerImg} blogId={blogId} />
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
            <div className="body">{reactBody}</div>
          </div>
        )}
      </Card>
      <div className="BottomBtn">
        <Flex align="center" justify="space-between">
          <Stack spacing={1} sx={{ flexDirection: "row", gap: "10px" }}>
            {!blogData?.published && (
              <Button
                variant="outline"
                leftIcon={loadingForPublish ? <Loader size={"xs"} /> : <IconGlobe />}
                onClick={() => publishBlog()}
              >
                {loadingForPublish ? "Publishing" : "Publish"}
              </Button>
            )}
            <Button
              variant={blogData?.published ? "outline" : "subtle"}
              color={blogData?.published ? "blue" : "dark"}
              leftIcon={loadingForSaveChanges ? <Loader size={"xs"} /> : <IconFile />}
              onClick={() => uploadCurrentState()}
            >
              {loadingForSaveChanges ? "Saving changes" : "Save changes"}
            </Button>
          </Stack>
          {/* <Link className="link" to="/">
            <Button variant="outline">Go to home</Button>
          </Link> */}
        </Flex>
      </div>
    </Container>
  );
};

export default EditBlogPage;
