import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import parse from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { Alert, Avatar, Box, Card, Container, Divider, Flex, Grid, Image, Skeleton, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { useGetBlogQuery, useGetBlogsForHomeQuery, usePostBlogViewCountMutation } from "../../../lib/api/blogApi";
import { useGetAuthorDataQuery } from "../../../lib/api/authApi";
import { useAppSelector } from "../../../lib/redux/hooks";
import { IconExclamationCircle } from "@tabler/icons-react";
import ErrorImage from "../../../assets/error.png";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import BlogCardNormalComponent from "../../../components/BlogCardSimple";
import "./style.scss";

const ReportBlogComponet = lazy(() => import("../../../components/ReportBlog"));
const BlogReactionsComponent = lazy(() => import("../../../components/BlogReactions"));
const FollowButtonComponent = lazy(() => import("../../../components/FollowButton"));
const CommentSectionComponent = lazy(() => import("../../../components/CommentSection"));

const ViewBlogPage = () => {
  const user = useAppSelector((state) => state.user.data);
  const { id: blogId } = useParams();
  const [postViewCountApi] = usePostBlogViewCountMutation();
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const { data: blogData, isError, isLoading: isBlogDataLoading, isFetching: isBlogDataFetching, error }: any = useGetBlogQuery({ blogId });
  const { data: blogsListData } = useGetBlogsForHomeQuery({});
  const { data: authorData, isLoading: isAuthorLoading, isFetching: isAuthorFetching } = useGetAuthorDataQuery(blogData?.author, { skip: !blogData });

  useEffect(() => {
    if (isBlogDataLoading || isBlogDataFetching) {
      nprogress.set(0);
      nprogress.start();
    } else {
      nprogress.complete();
    }
  }, [isBlogDataLoading, isBlogDataFetching]);

  const [blogDataToShow, setBlogDataToShow] = useState<any>("");

  useEffect(() => {
    document.getElementsByTagName("html")[0].scrollTop = 0;
    (async () => {
      await postViewCountApi(blogId).catch((err) => {
        console.warn(err);
      });
    })();
  }, [blogId]);

  useEffect(() => {
    if (blogData?.body) {
      const htmlOfDelta = new QuillDeltaToHtmlConverter(blogData.body?.[0]?.ops);
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
    <Container className="BlogViewPage" p={10}>
      <NavigationProgress />
      {!isError && (
        <Grid>
          <Grid.Col span={12}>
            <>
              <h1 style={{ marginBottom: 0 }}>{blogData?.title}</h1>
              {blogData?.disabled && (
                <Alert my={20} icon={<IconExclamationCircle />} color="red" variant="outline">
                  This blog has been disabled due to discovery of issues with the content and will be hidden for other users
                </Alert>
              )}
              <Text color="dimmed" size={"sm"}>
                Created at : {new Date(blogData?.createdAt).toDateString()}
              </Text>
              <Box className="user" w={"100%"} my={20}>
                {/* <Flex mt={20} align={"center"} w={"100%"} justify={"space-between"}> */}
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
                  {isAuthorLoading || isAuthorFetching ? (
                    <Skeleton w={100} h={40} />
                  ) : (
                    <>
                      {user && (
                        <Suspense fallback={<></>}>
                          <FollowButtonComponent userId={authorData?.uid} />
                        </Suspense>
                      )}
                    </>
                  )}
                </Flex>
                {/* </Flex> */}
              </Box>
              <Image width="100%" height={400} src={blogData?.bannerImgURL} withPlaceholder radius={5} />
              <br />
              <Text fw="bold" fz="xl">
                {blogData?.subtitle}
              </Text>
              <Card withBorder my={10}>
                <Text size={"sm"} mb={10}>
                  {formatter.format(blogData?.views)} views . {formatter.format(blogData?.comments)} Comments
                </Text>
                <Suspense fallback={<></>}>
                  <BlogReactionsComponent blogId={blogId} />
                </Suspense>
              </Card>
              <Divider />
              <div className="body">{blogDataToShow ? blogDataToShow : <Skeleton w="100%" h={100} />}</div>
              <Divider my={20} />
              <Suspense fallback={<></>}>
                <CommentSectionComponent blog={blogData} blogId={blogId} skip={!blogData} />
              </Suspense>
              {!blogData?.disabled && (
                <Box my={20}>
                  <Suspense fallback={<></>}>
                    <ReportBlogComponet blogId={blogId} />
                  </Suspense>
                </Box>
              )}
              {!blogData?.disabled && (
                <Box>
                  <h2>Related Blogs</h2>
                  <Grid gutter={"lg"}>
                    {blogsListData?.map((blog: any) => {
                      return <BlogCardNormalComponent span={12} key={blog?.blogId} blog={blog} />;
                    })}
                    {blogsListData?.length === 0 && <h3 style={{ padding: 10 }}>Yay.. There is nothing private here</h3>}
                  </Grid>
                </Box>
              )}
            </>
          </Grid.Col>
        </Grid>
      )}
      {isError && (
        <>
          <Image mt={100} src={ErrorImage} maw={500} mx={"auto"} />
          <Flex align={"start"} gap={10} justify={"center"}>
            <IconExclamationCircle style={{ marginTop: 8 }} size={"30px"} />{" "}
            <Text mt={0} sx={{ lineHeight: 1.5 }} fz={"30px"} fw={"bold"}>
              {error?.data?.error ?? "Oops something went wrong !"}
            </Text>
          </Flex>
        </>
      )}
    </Container>
  );
};

export default ViewBlogPage;
