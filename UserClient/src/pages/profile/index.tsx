import { Avatar, Box, Button, Card, Chip, Flex, Grid, Image, Tabs, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetUserDataWithUidQuery } from "../../lib/api/authApi";
import { useGetBlogDataDisplayQuery } from "../../lib/api/blogApi";
import { IconLock, IconPhoto, IconWorld } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { useAppSelector } from "../../lib/redux/hooks";
import BlogCardComponent from "../../components/profile/blogs/blogCardSettings";
import SettingsComponent from "../../components/profile/settings";
import { useEffect, useState } from "react";
import BlogCardSkeltonComponent from "../../components/profile/blogs/blogCardSkelton";
import FollowButtonComponent from "../../components/profile/followButton";

const UserProfilePage = () => {
  const { id: userId } = useParams();
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isFetching: isUserDataFetching,
  } = useGetUserDataWithUidQuery(userId);

  const {
    data: blogData,
    isLoading: isBlogDataLoading,
    isFetching: isBlogDataFetching,
  } = useGetBlogDataDisplayQuery(userId, { skip: !userData });

  const user = useAppSelector((state) => state.user.data);

  useEffect(() => {
    document.getElementsByTagName("html")[0].scrollTop = 0;
  }, [userId]);

  const [allBlogs, setAllBlogs] = useState([]);
  const [publicBlogs, setPublicBlogs] = useState([]);
  const [privateBlogs, setPrivateBlogs] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);
  const [tabsValue, setTabsValue] = useState<string | null>("all-blogs");

  useEffect(() => {
    setTabsValue("all-blogs");
  }, [userId, user]);

  useEffect(() => {
    if (isUserDataLoading || isUserDataFetching) setUserDataLoading(true);
    else setUserDataLoading(true);
  }, [isUserDataLoading, isUserDataFetching]);

  useEffect(() => {
    if (blogData) {
      setAllBlogs(blogData);
      setPublicBlogs(blogData.filter((blog: any) => blog?.published == true));
      setPrivateBlogs(blogData.filter((blog: any) => blog?.published == false));
    }
    if (isBlogDataLoading) {
      setBlogLoading(true);
    } else {
      setBlogLoading(false);
    }
  }, [blogData, isBlogDataLoading, isBlogDataFetching]);

  const BlogsList = ({ data }: { data: any[] }) => {
    const skeltonData = Array(5).fill("");

    if (blogLoading) {
      return (
        <Grid>
          {skeltonData?.map((blog: any, index) => {
            return <BlogCardSkeltonComponent key={index} />;
          })}
        </Grid>
      );
    }

    return (
      <Grid gutter={"lg"}>
        {data?.map((blog: any) => {
          return <BlogCardComponent key={blog?.blogId} blog={blog} userId={userId} />;
        })}
        {(data?.length === 0 || !blogData) && (
          <Flex
            style={{ padding: 30 }}
            justify={"center"}
            align={"center"}
            direction={"column"}
            sx={{ position: "relative", width: "100%" }}
          >
            <h1>No blogs here</h1>
          </Flex>
        )}
      </Grid>
    );
  };

  return (
    <div style={{ padding: "25px" }}>
      <div className="porfileCont">
        <Flex gap={"30px"} align={"center"} my={20}>
          <Avatar size={"xl"} radius={"lg"} src={userData?.photoURL} />
          <div>
            <Flex mb={10} align={"center"} gap={20}>
              <h1 style={{ margin: 0, padding: 0 }}>{userData?.name}</h1>
              {user && user?.uid != userId && <FollowButtonComponent userId={userData?.uid} />}
            </Flex>
            <Flex gap={10}>
              <Chip checked={false}>{blogData?.length ?? 0} Blogs</Chip>
              <Chip checked={false}>{userData?.followers ?? 0} Followers</Chip>
              <Chip checked={false}>{userData?.following ?? 0} Following</Chip>
            </Flex>
          </div>
        </Flex>
        <Text my={20}>{userData?.bio}</Text>
      </div>

      <Tabs value={tabsValue} onTabChange={setTabsValue}>
        <Tabs.List mb={15}>
          <Tabs.Tab value="all-blogs" icon={<IconPhoto size="20px" />}>
            All Blogs
          </Tabs.Tab>
          {user?.uid == userId && (
            <Tabs.Tab value="public" icon={<IconWorld size="20px" />}>
              Public
            </Tabs.Tab>
          )}
          {user?.uid == userId && (
            <Tabs.Tab value="private" icon={<IconLock size="20px" />}>
              Private
            </Tabs.Tab>
          )}
          {user?.uid == userId && (
            <Tabs.Tab value="settings" icon={<IconSettings size="20px" />}>
              Settings
            </Tabs.Tab>
          )}
        </Tabs.List>

        <Tabs.Panel value="all-blogs" pt="xs">
          <BlogsList data={allBlogs} />
        </Tabs.Panel>

        <Tabs.Panel value="public" pt="xs">
          <BlogsList data={publicBlogs} />
        </Tabs.Panel>

        <Tabs.Panel value="private" pt="xs">
          <BlogsList data={privateBlogs} />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <SettingsComponent />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
