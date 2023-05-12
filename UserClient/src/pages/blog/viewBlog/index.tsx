import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, Button, Container, Flex, Image, Skeleton, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import parse from "html-react-parser";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import CommentSectionComponent from "../../../components/blog/commentSection";
import { useGetBlogQuery } from "../../../lib/api/blogApi";
import { useGetAuthorDataQuery } from "../../../lib/api/authApi";
import { useAppSelector } from "../../../lib/redux/hooks";

const BlogViewPage = () => {
  const user = useAppSelector((state) => state.user.data);
  const { id: blogId } = useParams();
  const { data: blogData } = useGetBlogQuery({ blogId });

  const {
    data: authorData,
    isLoading: isAuthorLoading,
    isFetching: isAuthorFetching,
  } = useGetAuthorDataQuery(blogData?.author, { skip: !blogData });

  const [blogDataToShow, setBlogDataToShow] = useState<any>("");

  useEffect(() => {
    if (blogData?.body) {
      const htmlOfDelta = new QuillDeltaToHtmlConverter(blogData.body?.ops);
      const reactBody = parse(htmlOfDelta.convert(), {
        replace: (domNode: any) => {
          if (domNode.name === "pre" && domNode.children?.[0]?.data) {
            return (
              <Prism language="javascript" sx={{ maring: 0, padding: 0, marginTop: "20px", overflow: "hidden" }}>
                {domNode.children?.[0]?.data}
              </Prism>
            );
          }
        },
      });
      setBlogDataToShow(reactBody);
    }
  }, [blogData]);

  return (
    <Container className="BlogViewPage">
      <h1 style={{ marginBottom: 0 }}>{blogData?.title}</h1>
      <Text color="dimmed" size={"sm"}>
        Created at : {new Date(blogData?.createdAt).toDateString()}
      </Text>
      <Box className="user" my={20}>
        <Flex mt={20} align={"center"} justify={"space-between"}>
          <Flex align={"center"} gap={10}>
            {isAuthorLoading || isAuthorFetching ? (
              <Skeleton radius={"xl"} w={40} h={40} />
            ) : (
              <Link className="link" to={`/profile/${authorData?.uid}`}>
                <Avatar radius={"xl"} src={authorData?.photoURL} />
              </Link>
            )}
            <Link className="link" to={`/profile/${authorData?.uid}`}>
              <div>
                {isAuthorLoading || isAuthorFetching ? <Skeleton w={150} h={20} /> : <Text>{authorData?.name}</Text>}
                {isAuthorLoading || isAuthorFetching ? <Skeleton mt={10} w={150} h={10} /> : ""}
              </div>
            </Link>
          </Flex>
          {isAuthorLoading || isAuthorFetching ? (
            <Skeleton w={100} h={40} />
          ) : (
            <>
              {user && (
                <Button variant="outline" color="indigo">
                  Follow
                </Button>
              )}
            </>
          )}
        </Flex>
      </Box>
      <Image width="100%" height={400} src={blogData?.bannerImgURL} withPlaceholder radius={5} />
      <br />
      <Text>{blogData?.subtitle}</Text>
      <div className="body">{blogDataToShow ? blogDataToShow : <Skeleton w="100%" h={100} />}</div>
      <div className="line"></div>
      <CommentSectionComponent blogId={blogId} skip={!blogData} />
    </Container>
  );
};

export default BlogViewPage;
