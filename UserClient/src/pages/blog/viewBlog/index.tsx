import "./style.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, Container, Flex, Grid, Image, Skeleton, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import parse from "html-react-parser";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import CommentSectionComponent from "../../../components/blog/commentSection";
import { useGetBlogQuery, useGetBlogsForHomeQuery } from "../../../lib/api/blogApi";
import { useGetAuthorDataQuery } from "../../../lib/api/authApi";
import { useAppSelector } from "../../../lib/redux/hooks";
import FollowButtonComponent from "../../../components/profile/followButton";
import { IconExclamationCircle } from "@tabler/icons-react";
import ErrorImage from "../../../assets/error.png";
import BlogActionButtonComponent from "../../../components/blog/blogActions";
import { NavigationProgress } from "@mantine/nprogress";
import ReportBlogComponet from "../../../components/blog/reportBlog";
import BlogCardComponent from "../../../components/profile/blogs/blogCard";

const BlogViewPage = () => {
  const user = useAppSelector((state) => state.user.data);
  const { id: blogId } = useParams();
  const { data: blogData, isError, error } = useGetBlogQuery({ blogId });
  const { data: blogsListData, isLoading, isFetching } = useGetBlogsForHomeQuery({});

  const {
    data: authorData,
    isLoading: isAuthorLoading,
    isFetching: isAuthorFetching,
  } = useGetAuthorDataQuery(blogData?.author, { skip: !blogData });

  const [blogDataToShow, setBlogDataToShow] = useState<any>("");

  useEffect(() => {
    document.getElementsByTagName("html")[0].scrollTop = 0;
  }, [blogId]);

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
      <NavigationProgress />
      {!isError && (
        <Grid>
          <Grid.Col span={12}>
            <>
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
                        {isAuthorLoading || isAuthorFetching ? (
                          <Skeleton w={150} h={20} />
                        ) : (
                          <Text>{authorData?.name}</Text>
                        )}
                        {isAuthorLoading || isAuthorFetching ? <Skeleton mt={10} w={150} h={10} /> : ""}
                      </div>
                    </Link>
                    {isAuthorLoading || isAuthorFetching ? (
                      <Skeleton w={100} h={40} />
                    ) : (
                      <>{user && <FollowButtonComponent userId={authorData?.uid} />}</>
                    )}
                  </Flex>

                  <BlogActionButtonComponent blogId={blogId} />
                </Flex>
              </Box>
              <Image width="100%" height={400} src={blogData?.bannerImgURL} withPlaceholder radius={5} />
              <br />
              <Text fw="bold" fz="xl">
                {blogData?.subtitle}
              </Text>
              <div className="body">{blogDataToShow ? blogDataToShow : <Skeleton w="100%" h={100} />}</div>
              <div className="line"></div>
              <ReportBlogComponet blogId={blogId} />
              <CommentSectionComponent blogId={blogId} skip={!blogData} />
              <Box>
                <h2>Related Blogs</h2>
                <Grid gutter={"lg"}>
                  {blogsListData?.map((blog: any) => {
                    return (
                      <BlogCardComponent span={6} key={blog?.blogId} blog={blog} userId={blog?.author} />
                    );
                  })}
                  {blogsListData?.length === 0 && <h3 style={{ padding: 10 }}>Yay.. There is nothing private here</h3>}
                </Grid>
              </Box>
            </>
          </Grid.Col>
        </Grid>
      )}
      {isError && (
        <>
          <Image mt={50} src={ErrorImage} maw={500} mx={"auto"} />
          <Flex align={"center"} gap={10} justify={"center"}>
            <IconExclamationCircle size={"30px"} />{" "}
            <Text fz={"30px"} fw={"bold"}>
              {error?.data?.error ?? "Oops something went wrong !"}
            </Text>
          </Flex>
        </>
      )}
    </Container>
  );
};

export default BlogViewPage;
