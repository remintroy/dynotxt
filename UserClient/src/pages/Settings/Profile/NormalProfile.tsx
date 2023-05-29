import { Avatar, Box, Chip, Container, Divider, Flex, Grid, Text } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import usePathHook from "../../../hooks/usePath";
import useUserDataHook from "../../../hooks/useUserData";
import { useGetUserDataWithUidQuery } from "../../../lib/api/authApi";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import { useGetBlogDataDisplayQuery } from "../../../lib/api/blogApi";
import { useEffect } from "react";
import { addBlogToAllBlogsProfile, resetProfile, setAllBlogsMetaDataProfile } from "../../../lib/redux/slices/profile";
import useThisIsPcHook from "../../../hooks/useThisIsPc";
import BlogCardComponent from "../../../components/BlogCardSimple";

const NormalProfileSubPage = () => {
  const path = usePathHook();
  const user = useUserDataHook();
  const { data: userData } = useGetUserDataWithUidQuery(path[1]);
  const blogData = useAppSelector((state) => state.profile?.allBlogsMetaData);
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const dispatch = useAppDispatch();
  const { data: blogsData } = useGetBlogDataDisplayQuery({ uid: path[1], page: 1 });
  useEffect(() => {
    // assignig AllBlogs data to redux
    if (blogsData) {
      blogsData?.docs?.forEach((blog: any) => {
        dispatch(addBlogToAllBlogsProfile(blog));
      });
      let allBlogsMetaData: any = JSON.stringify(blogsData);
      allBlogsMetaData = JSON.parse(allBlogsMetaData);
      allBlogsMetaData.docs = null;
      dispatch(setAllBlogsMetaDataProfile(allBlogsMetaData));
    }
  }, [blogsData]);

  useEffect(() => {
    return () => {
      dispatch(resetProfile());
    };
  }, [userData]);

  const allBlogsData = useAppSelector((state) => state.profile.allBlogs);
  const thisIsPc = useThisIsPcHook();

  return (
    <Container style={{ padding: thisIsPc ? "20px" : 5 }}>
      <NavigationProgress progressLabel="Page progress bar" />
      <Box>
        <Flex gap={thisIsPc ? "30px" : "15px"} align={"center"} my={20}>
          <Avatar alt={`${user?.name}'s profile photo`} size={thisIsPc ? "xl" : "lg"} radius={"lg"} src={userData?.photoURL} />
          <div>
            <Flex mb={10} align={"center"} gap={20}>
              <Text fz={thisIsPc ? "28px" : "xl"} fw="bold" style={{ margin: 0, padding: 0 }}>
                {userData?.name}
              </Text>
            </Flex>
            <Flex gap={5}>
              <Chip size={thisIsPc ? "sm" : "xs"} checked={false}>
                {formatter.format(blogData?.totalDocs ?? 0)} Blogs
              </Chip>
              <Chip size={thisIsPc ? "sm" : "xs"} checked={false}>
                {formatter.format(userData?.followers ?? 0)} Followers
              </Chip>
              <Chip size={thisIsPc ? "sm" : "xs"} checked={false}>
                {formatter.format(userData?.following ?? 0)} Following
              </Chip>
            </Flex>
          </div>
        </Flex>
        <Text my={20}>{userData?.bio}</Text>
      </Box>
      <Divider />
      <Grid mt={20}>
        {Object.keys(allBlogsData)?.map((blogId: any) => {
          const blog = allBlogsData[blogId];
          return <BlogCardComponent key={blog?.blogId} blog={blog} />;
        })}
      </Grid>
    </Container>
  );
};

export default NormalProfileSubPage;
