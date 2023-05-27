import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, Chip, Container, Flex, Grid, Loader, Tabs, Text } from "@mantine/core";
import { IconWorld, IconPhoto, IconLock } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { useGetUserDataWithUidQuery } from "../../../lib/api/authApi";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import { useGetBlogDataDisplayQuery } from "../../../lib/api/blogApi";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { addBlogToAllBlogsProfile, resetProfile, setAllBlogsMetaDataProfile } from "../../../lib/redux/profileSlice";
import FollowButtonComponent from "../../../components/profile/followButton";
import BlogCardWithSettingsComponent from "../../../components/profile/blogs/blogCardSettings";

const AllBlogListComponent = () => {
  const { id: userId } = useParams();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { data: blogsData, isLoading, isFetching } = useGetBlogDataDisplayQuery({ uid: userId, page });
  const allBlogsData = useAppSelector((state) => state.profile.allBlogs);
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
  }, []);

  useEffect(() => {
    if (isLoading || isFetching) {
      nprogress.set(0);
      nprogress.start();
    } else nprogress.complete();
  }, [isLoading, isFetching]);

  const handleShowMore = () => {
    // when page changes next page data is requested
    setPage((blogsData?.page ?? 0) + 1);
  };

  return (
    <>
      <Grid>
        {Object.keys(allBlogsData)?.map((blogId: any) => {
          const blog = allBlogsData[blogId];
          return <BlogCardWithSettingsComponent span={12} key={blog?.blogId} blog={blog} userId={userId} />;
        })}
      </Grid>
      {blogsData?.hasNextPage && (
        <Box py={50} display="flex" sx={{ justifyContent: "center" }}>
          <Button
            variant="default"
            onClick={handleShowMore}
            leftIcon={isLoading || isFetching ? <Loader size={"xs"} /> : ""}
          >
            Show More
          </Button>
        </Box>
      )}
    </>
  );
};

const UserProfilePage = () => {
  const { id: userId } = useParams();
  const currentUser = useAppSelector((state) => state.user.data);
  const blogData = useAppSelector((state) => state.profile?.allBlogsMetaData);
  const [tabsValue, setTabsValue] = useState<string | null>("all-blogs");
  const formatter = Intl.NumberFormat("us", { notation: "compact" });
  const { data: userData } = useGetUserDataWithUidQuery(userId);
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);

  return (
    <Container p={0}>
      <NavigationProgress />
      <Box>
        <Flex gap={thisIsPc ? "30px" : "15px"} align={"center"} my={20}>
          <Avatar size={thisIsPc ? "xl" : "lg"} radius={"lg"} src={userData?.photoURL} />
          <div>
            <Flex mb={10} align={"center"} gap={20}>
              <Text fz={thisIsPc ? "28px" : "xl"} fw="bold" style={{ margin: 0, padding: 0 }}>
                {userData?.name}
              </Text>
            </Flex>
            <Flex gap={5}>
              <Chip size={thisIsPc ? "md" : "xs"} checked={false}>
                {formatter.format(blogData?.totalDocs ?? 0)} Blogs
              </Chip>
              <Chip size={thisIsPc ? "md" : "xs"} checked={false}>
                {formatter.format(userData?.followers ?? 0)} Followers
              </Chip>
              <Chip size={thisIsPc ? "md" : "xs"} checked={false}>
                {formatter.format(userData?.following ?? 0)} Following
              </Chip>
            </Flex>
          </div>
        </Flex>
        <Text my={20}>{userData?.bio}</Text>
      </Box>

      <Tabs value={tabsValue} onTabChange={setTabsValue}>
        <Tabs.List mb={15}>
          <Tabs.Tab value="all-blogs" icon={<IconPhoto size="20px" />}>
            All Blogs
          </Tabs.Tab>
          {currentUser?.uid == userId && (
            <Tabs.Tab value="public" icon={<IconWorld size="20px" />}>
              Public
            </Tabs.Tab>
          )}
          {currentUser?.uid == userId && (
            <Tabs.Tab value="private" icon={<IconLock size="20px" />}>
              Private
            </Tabs.Tab>
          )}
          {currentUser?.uid == userId && (
            <Tabs.Tab value="settings" icon={<IconSettings size="20px" />}>
              Settings
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="all-blogs" pt="xs">
          <AllBlogListComponent />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default UserProfilePage;
